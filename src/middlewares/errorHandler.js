const response = require("@/utils/response");

const errorHandler = (error, req, res, next) => {
  response.error(res, error.cause.status, error.message, error.cause.errors);
};

module.exports = errorHandler;
