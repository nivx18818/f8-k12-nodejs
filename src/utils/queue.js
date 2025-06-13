const queueModel = require("@/models/queue.model");

const dispatch = async (type, payload) => {
  await queueModel.create({
    type,
    payload: JSON.stringify(payload),
  });
};

module.exports = { dispatch };
