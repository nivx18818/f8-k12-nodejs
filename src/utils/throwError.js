const throwError = (status, message, errors) => {
  throw new Error(message, {
    cause: {
      status,
      errors,
    },
  });
};

const throw404 = (message) => throwError(404, message);

module.exports = {
  throwError,
  throw404,
};
