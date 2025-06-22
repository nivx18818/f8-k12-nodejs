const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.create = [
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Title is required",
    },
    content: {
      notEmpty: true,
      errorMessage: "Body is required",
    },
  }),
  handleValidationErrors,
];

exports.update = [
  checkSchema({
    title: {
      optional: true,
      notEmpty: true,
      errorMessage: "Title cannot be empty",
    },
    content: {
      optional: true,
      notEmpty: true,
      errorMessage: "Body cannot be empty",
    },
  }),
  handleValidationErrors,
];
