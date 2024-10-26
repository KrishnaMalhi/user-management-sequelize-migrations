const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const ResponseUtils = require("./responseUtils");

const signJWTToken = (user) => {
  let token = jwt.sign({ user }, config.secret, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });

  return token;
};

const verifyJWTToken = async (token, req, res) => {
  console.log("token in verifyJWTToken: ", token);
  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return ResponseUtils.sendError(res, req, {}, "Unauthorized!", 401);
    }

    req.user = decoded.user;

    return true;
  });
};

module.exports = { signJWTToken, verifyJWTToken };
