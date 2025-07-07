require("dotenv").config();
require("module-alias/register");

const queueModel = require("@/models/queue.model");
const sendVerificationEmail = require("@/jobs/sendVerificationEmail");
const sendPasswordResetEmail = require("@/jobs/sendPasswordResetEmail");
const sendPasswordChangedNotification = require("@/jobs/sendPasswordChangedNotification");

const handlers = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedNotification,
  sendScheduledEmail: async () => {
    await require("@/config/mailer").sendMail({
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_RECEIVER_SAMPLE,
      subject: `Scheduled Email`,
      html: `
        <h1>Never mind!</h1>
        <p>Just check if this fking code still works.</p>
      `,
    });
  },
};

const processJob = async (job) => {
  const handler = handlers[job.type];
  if (handler) {
    try {
      await queueModel.update(job.id, { status: "processing" });
      handler({ ...job, payload: JSON.parse(job.payload) });
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
        const toRetry = job.retry_count < job.max_retries && new Date() - job.updated_at >= 4000;
        if (toRetry) {
          await queueModel.update(job.id, {
            status: "pending",
            retry_count: job.retry_count + 1,
          });
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  },
};

queueWorker.work();
