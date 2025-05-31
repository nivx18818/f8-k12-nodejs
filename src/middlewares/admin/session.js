const sessionsModel = require("@/models/sessions.model");
const { randomUUID } = require("crypto");

const session = async (req, res, next) => {
  let _sid = req.cookies.sid;
  let session = _sid && (await sessionsModel.findBySid(_sid));

  if (!session) {
    _sid = randomUUID();
    const date = new Date();
    session = await sessionsModel.create({ sid: _sid, data: "{}" });
    date.setDate(date.getDate() + 1);
    res.set("set-cookie", `sid=${_sid}; path=/; httpOnly; expires=${date}`);
  }

  req.session = JSON.parse(session.data);

  res.setFlash = (data) => {
    req.session.flash = data;
  }

  res.on("finish", () => {
    sessionsModel.update(_sid, {
      data: JSON.stringify(req.session),
    });
  });

  next();
};

module.exports = session;
