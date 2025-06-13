const path = require("path");
const ejs = require("ejs");
const { BASE_DIR } = require("@/config/constants");

const loadEmail = async (template, data) => {
  const emailTemplatePath = path.join(
    BASE_DIR,
    "src/views/emails",
    `${template}.ejs`
  );
  const html = await ejs.renderFile(emailTemplatePath, data);
  return html;
};

module.exports = loadEmail;
