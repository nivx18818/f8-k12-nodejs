const usersService = require("@/services/users.service");

const shareLocals = async (req, res, next) => {
  const userId = req.session.userId;
  res.locals.auth = null;

  if (userId) {
    res.locals.auth = await usersService.getById(userId);
  } else {
    res.locals.layout = "admin/layouts/auth";
  }

  res.locals.flash = req.session.flash;
  delete req.session.flash;

  next();
};

module.exports = shareLocals;
