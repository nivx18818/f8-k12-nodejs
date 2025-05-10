const throwError = (status, message, errors) => {
  throw new Error(message, {
    cause: {
      status,
      errors,
    },
  });
};

module.exports = throwError;
