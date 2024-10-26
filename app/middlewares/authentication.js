const JwtUtils = require("../utils/jwtUtils.js");
const logger = require("../utils/loggerUtils.js");
const ResponseUtils = require("../utils/responseUtils.js");

const verifyToken = async (req, res, next) => {
  if (req.headers["authorization"]) {
    let token = req.headers["authorization"];
    console.log("token: ", token);

    if (!token) {
      logger.error("no token provided!");
      return sendError(res, {}, "Token not provided!", 403);
    }
    const verified = await JwtUtils.verifyJWTToken(token, req, res);

    if (verified) next();
  } else {
    logger.error("no authorization header provided!");

    return ResponseUtils.sendError(res, req, {}, "Token not provided!", 403);
  }

  // const token = req.cookies.token;
  // if (!token) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // try {
  //   const verified = await JwtUtils.verifyJWTToken(token, req, res);

  //   if (verified) next();
  // } catch (err) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }
};

const JwtAuthentication = {
  verifyToken,
};
module.exports = JwtAuthentication;
