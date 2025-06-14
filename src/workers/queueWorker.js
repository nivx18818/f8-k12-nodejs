require("dotenv").config();
require("module-alias/register");
const queueModel = require("@/models/queue.model");
const sendVerificationEmail = require("@/jobs/sendVerificationEmail");

const handlers = { sendVerificationEmail };

const processJob = async (job) => {
  const handler = handlers[job.type];
  if (handler) {
    try {
      await queueModel.update(job.id, {
        status: "processing",
        retry_count: job.status == "rejected" ? job.retry_count + 1 : 0,
      });
      handler(job);
      await queueModel.update(job.id, { status: "completed" });
    } catch (error) {
      console.error(error);
      await queueModel.update(job.id, {
        status: job.retry_count < job.max_retries ? "rejected" : "completed",
      });
    }
  }
};

const queueWorker = {
  work: async () => {
    while (true) {
      const pendingJobs = await queueModel.findByStatus("pending");
      for (const job of pendingJobs) {
        await processJob(job);
      }

      const rejectedJobs = await queueModel.findByStatus("rejected");
      for (const job of rejectedJobs) {
        const toRetry =
          job.retry_count < job.max_retries && new Date() - job.updated_at >= 4;
        if (toRetry) {
          await queueModel.update(job.id, { status: "pending" });
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  },
};

queueWorker.work();
