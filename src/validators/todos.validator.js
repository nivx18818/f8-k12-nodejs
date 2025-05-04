const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.store = [
  checkSchema({
    todo: {
      notEmpty: true,
      errorMessage: "Todo is required",
    },
    completed: {
      notEmpty: {
        errorMessage: "Completed is required",
      },
      isBoolean: {
        errorMessage: "Completed must be a boolean",
      },
    },
    userId: {
      notEmpty: {
        errorMessage: "Completed is required",
      },
      isNumeric: {
        errorMessage: "UserId must be a number",
      }
    },
  }),
  handleValidationErrors,
];

exports.update = [
  checkSchema({
    todo: {
      optional: true,
      notEmpty: true,
      errorMessage: "Todo cannot be empty",
    },
    completed: {
      optional: true,
      notEmpty: {
        errorMessage: "Completed is required",
      },
      isBoolean: {
        errorMessage: "Completed must be a boolean",
      },
    },
    userId: {
      optional: true,
      notEmpty: {
        errorMessage: "Completed is required",
      },
      isNumeric: {
        errorMessage: "UserId must be a number",
      },
    },
  }),
  handleValidationErrors,
];
