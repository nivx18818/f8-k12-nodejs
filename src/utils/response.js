const success = (res, status, data) => {
  if (status === 204) {
    return res.status(status).send();
  }

  return res.status(status).json({
    success: true,
    data,
  });
};

const error = (res, status, message, errors) => {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  success,
  error,
};
