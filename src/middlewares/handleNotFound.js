const response = require("@/utils/response");

const handleNotFound = (req, res) => {
  response.error(res, 404, "Resource not found");
};

module.exports = handleNotFound;
