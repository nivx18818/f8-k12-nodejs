const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result
    .array({ onlyFirstError: true })
    .reduce((errors, err) => {
      errors[err.path] = err.msg;
      return errors;
    }, {});

  res.flash("error", "Please correct the errors below and try again.");

  res.render(res.view, {
    errors,
    old: req.body,
  });
};

module.exports = handleValidationErrors;
