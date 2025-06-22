const throwError = (status, message, errors) => {
  throw new Error(message, {
    cause: {
      status,
      errors,
    },
  });
};

const throw404 = (message = "Resource not found") => throwError(404, message);

module.exports = {
  throwError,
  throw404,
};
