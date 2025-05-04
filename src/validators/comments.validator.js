const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.store = [
  checkSchema({
    postId: {
      notEmpty: {
        errorMessage: "Post ID is required",
      },
      isNumeric: {
        errorMessage: "Post ID must be a number",
      }
    },
    name: {
      notEmpty: true,
      errorMessage: "Name is required",
    },
    email: {
      notEmpty: {
        errorMessage: "Email is required",
      },
      isEmail: {
        errorMessage: "Email is not valid",
      },
    },
    body: {
      notEmpty: true,
      errorMessage: "Body is required",
    },
  }),
  handleValidationErrors,
];

exports.update = [
  checkSchema({
    postId: {
      optional: true,
      notEmpty: {
        errorMessage: "Post ID is required",
      },
      isNumeric: {
        errorMessage: "Post ID must be a number",
      },
    },
    name: {
      optional: true,
      notEmpty: true,
      errorMessage: "Name cannot be empty",
    },
    email: {
      optional: true,
      notEmpty: {
        errorMessage: "Email cannot be empty",
      },
      isEmail: {
        errorMessage: "Email is not valid",
      },
    },
    body: {
      optional: true,
      notEmpty: true,
      errorMessage: "Body cannot be empty",
    },
  }),
  handleValidationErrors,
];
