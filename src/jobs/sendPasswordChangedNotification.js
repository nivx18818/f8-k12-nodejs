const jwt = require("@/utils/jwt");
const transporter = require("@/config/mailer");
const loadEmail = require("@/utils/loadEmail");
const usersService = require("@/services/users.service");

const sendPasswordChangedNotification = async (job) => {
  const { userId } = job.payload;
  const user = await usersService.getById(userId);

  const loginUrl = `${process.env.APP_URL}/admin/login`;

  const emailTemplate = await loadEmail("auth/password-changed", {
    user,
    loginUrl,
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: user.email,
    subject: `Password Changed Notification for ${user.name}`,
    html: emailTemplate,
  });
};

module.exports = sendPasswordChangedNotification;
