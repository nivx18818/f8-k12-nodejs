const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createUser = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    name: {
      notEmpty: true,
      errorMessage: "Name is required.",
    },
    email: {
      notEmpty: {
        errorMessage: "Email is required.",
      },
      isEmail: {
        errorMessage: "Invalid email format.",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Password is required.",
      },
      isLength: {
        options: {
          min: 8,
        },
        errorMessage: "Password must be at least 8 characters long.",
      },
    },
  }),
  handleValidationErrors,
];
