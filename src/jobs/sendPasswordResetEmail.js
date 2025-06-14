const jwt = require("@/utils/jwt");
const transporter = require("@/config/mailer");
const loadEmail = require("@/utils/loadEmail");
const usersService = require("@/services/users.service");

const sendPasswordResetEmail = async (job) => {
  const { userId } = job.payload;
  const user = await usersService.getById(userId);

  const token = jwt.createToken({ userId });
  const resetUrl = `${process.env.APP_URL}/admin/reset-password?token=${token}`;

  const emailTemplate = await loadEmail("auth/reset-password", {
    user,
    resetUrl,
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER_SAMPLE, // user.email
    subject: "Password Reset Request",
    html: emailTemplate,
  });
};

module.exports = sendPasswordResetEmail;
