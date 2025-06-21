require("dotenv").config();
require("module-alias/register");

const cron = require("node-cron");
const queue = require("@/utils/queue");

const tasks = {};

const scheduleJob = (name, cronTime, handler) => {
  const task = cron.schedule(cronTime, () => {
    try {
      handler();
    } catch (error) {
      console.error(error);
    }
  });
  tasks[name] = task;
};

module.exports = scheduleJob;
