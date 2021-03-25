const jwt = require("jsonwebtoken");
const TokenExpiredError = jwt;
const { secret } = require("../../config");
const isAuthenticated = function (req, res, next) {
  rawToken = req.headers.authorization;
  token = rawToken.replace("Bearer ", "");
  try {
    userDetail = jwt.verify(token, secret);
  } catch (TokenExpiredError) {
    return res.status(500).json({
      message: "Token has expired",
    });
  }
  req.global = { user_id: userDetail.user_id };
  next();
};
module.exports = isAuthenticated;
