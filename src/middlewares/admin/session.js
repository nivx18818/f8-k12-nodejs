const sessionsModel = require("@/models/sessions.model");
const { randomUUID } = require("crypto");

const session = async (req, res, next) => {
  let sid = req.cookies.sid;
  let session = sid && (await sessionsModel.findById(sid));

  if (!session) {
    sid = randomUUID();
    const date = new Date();
    date.setDate(date.getDate() + 7);

    session = await sessionsModel.create({
      id: sid,
      data: "{}",
      expires_at: date,
    });

    res.cookie("sid", sid, {
      path: "/",
      expires: date,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  req.session = JSON.parse(session.data);

  if (!req.session.flashMessages) {
    req.session.flashMessages = [];
  }

  res.flash = (type, message) => {
    req.session.flashMessages.push({ type, message });
  };

  res.getFlashMessages = (type) => {
    if (!type) return req.session.flashMessages;
    return req.session.flashMessages.filter((message) => message.type === type);
  };

  res.on("finish", () => {
    sessionsModel.update(sid, {
      data: JSON.stringify(req.session),
    });
  });

  next();
};

module.exports = session;
