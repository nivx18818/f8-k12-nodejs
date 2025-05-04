const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.store = [
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Title is required",
    },
    description: {
      notEmpty: true,
      errorMessage: "Description is required",
    },
    price: {
      notEmpty: {
        errorMessage: "Price is required",
      },
      isNumeric: {
        errorMessage: "Price must be a number",
      },
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
    description: {
      optional: true,
      notEmpty: true,
      errorMessage: "Description cannot be empty",
    },
    price: {
      optional: true,
      notEmpty: {
        errorMessage: "Price is required",
      },
      isNumeric: {
        errorMessage: "Price must be a number",
      },
    },
  }),
  handleValidationErrors,
];
