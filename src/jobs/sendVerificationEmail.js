const jwt = require("@/utils/jwt");
const transporter = require("@/config/mailer");
const loadEmail = require("@/utils/loadEmail");
const usersService = require("@/services/users.service");

const sendVerificationEmail = async (job) => {
  const { userId } = job.payload;
  const user = await usersService.getById(userId);

  const token = jwt.createToken({ userId });
  const verificationUrl = `${process.env.APP_URL}/admin/verify-email?token=${token}`;

  const emailTemplate = await loadEmail("auth/verification", {
    user,
    verificationUrl,
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER_SAMPLE, // user.email
    subject: `Email Verification for ${user.name}`,
    html: emailTemplate,
  });
};

module.exports = sendVerificationEmail;
