const db = require("@/config/db");

exports.findAll = async () => {
  const [queue] = await db.query("SELECT * FROM queue");
  return queue;
};

exports.findById = async (id) => {
  const [queue] = await db.query("SELECT * FROM queue WHERE id = ?", [id]);
  return queue[0];
};

exports.findByStatus = async (status) => {
  const [queue] = await db.query("SELECT * FROM queue WHERE status = ?", [
    status,
  ]);
  return queue;
};

exports.create = async (newJob) => {
  const [result] = await db.query("INSERT INTO queue SET ?", [newJob]);
  return { ...newJob, id: result.insertId };
};

exports.update = async (id, updatedJob) => {
  await db.query("UPDATE queue SET ? WHERE id = ?", [updatedJob, id]);
  return updatedJob;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM queue WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
