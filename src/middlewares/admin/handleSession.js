const sessionsModel = require("@/models/sessions.model");
const { randomUUID } = require("crypto");

const handleSession = async (req, res, next) => {
  let _sid = req.cookies.sid;
  let session = _sid && (await sessionsModel.findBySid(_sid));

  if (!session) {
    _sid = randomUUID();
    const date = new Date();
    session = await sessionsModel.create({ sid: _sid });
    date.setDate(date.getDate() + 1);
    res.set("set-cookie", `sid=${_sid}; path=/; httpOnly; expires=${date}`);
  }

  const sessionData = JSON.parse(session.data ?? null) ?? {};

  req.session = {
    get(key) {
      return sessionData[key] ?? null;
    },
    set(key, value) {
      sessionData[key] = value;
      sessionsModel.update(_sid, {
        data: JSON.stringify(sessionData),
      });
    },
  };

  next();
};

module.exports = handleSession;
