const path = require("path");
const ejs = require("ejs");

const loadEmail = async (template, data) => {
  const emailTemplatePath = path.join(
    process.env.BASE_DIR,
    "src/views/emails",
    `${template}.ejs`
  );
  const html = await ejs.renderFile(emailTemplatePath, data);
  return html;
};

module.exports = loadEmail;
