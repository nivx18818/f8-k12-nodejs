const response = require("@/utils/response");

const notFoundHandler = (req, res) => {
  response.error(res, 404, "Resource not found");
};

module.exports = notFoundHandler;
