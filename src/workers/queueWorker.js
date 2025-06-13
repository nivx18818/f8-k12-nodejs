require("dotenv").config();
require("module-alias/register");
const queueModel = require("@/models/queue.model");
const sendVerificationEmail = require("@/jobs/sendVerificationEmail");

const handlers = { sendVerificationEmail };

const processJob = async (job) => {
  const handler = handlers[job.type];
  if (handler) {
    try {
      await queueModel.update(job.id, { status: "processing" });
      handler(job);
      await queueModel.update(job.id, { status: "completed" });
    } catch (error) {
      console.error(error);
      await queueModel.update(job.id, { status: "rejected" });
    }
  }
};

const queueWorker = {
  work: async () => {
    while (true) {
      const jobs = await queueModel.findByStatus("pending");
      for (const job of jobs) {
        await processJob(job);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  },
};

queueWorker.work();
