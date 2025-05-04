const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.store = [
  checkSchema({
    name: {
      notEmpty: true,
      errorMessage: "Name is required",
    },
    description: {
      notEmpty: true,
      errorMessage: "Description is required",
    },
  }),
  handleValidationErrors,
];

exports.update = [
  checkSchema({
    name: {
      optional: true,
      notEmpty: true,
      errorMessage: "Name cannot be empty",
    },
    description: {
      optional: true,
      notEmpty: true,
      errorMessage: "Description cannot be empty",
    },
  }),
  handleValidationErrors,
];
