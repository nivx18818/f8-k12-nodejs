const response = require("@/utils/response");

const handleErrors = (error, req, res, next) => {
  response.error(res, error.cause?.status ?? 500, error.message, error.cause?.errors);
};

module.exports = handleErrors;
