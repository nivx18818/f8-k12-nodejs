const db = require("@/configs/db");

exports.findAll = async () => {
  const [sessions] = await db.query("SELECT * FROM sessions");
  return sessions;
};

exports.findBySid = async (sid) => {
  const [sessions] = await db.query("SELECT * FROM sessions WHERE sid = ?", [sid]);
  return sessions[0];
};

exports.create = async (newSession) => {
  const [result] = await db.query("INSERT INTO sessions SET ?", [newSession]);
  return { ...newSession, sid: result.insertId };
};

exports.update = async (sid, updatedSession) => {
  await db.query("UPDATE sessions SET ? WHERE sid = ?", [updatedSession, sid]);
  return updatedSession;
};
