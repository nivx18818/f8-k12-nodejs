const db = require("@/configs/db");

exports.findAll = async () => {
  const [sessions] = await db.query("SELECT * FROM sessions");
  return sessions;
};

exports.findById = async (id) => {
  const [sessions] = await db.query("SELECT * FROM sessions WHERE id = ?", [id]);
  return sessions[0];
};

exports.create = async (newSession) => {
  const [result] = await db.query("INSERT INTO sessions SET ?", [newSession]);
  return { ...newSession, id: result.insertId };
};

exports.update = async (id, updatedSession) => {
  await db.query("UPDATE sessions SET ? WHERE id = ?", [updatedSession, id]);
  return updatedSession;
};
