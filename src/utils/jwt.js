const jwt = require("jsonwebtoken");

exports.createToken = (payload, options = {}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
    ...options,
  });
  return token;
};

exports.verifyToken = (token) => {
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    return {
      success: true,
      data: decodedData,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
