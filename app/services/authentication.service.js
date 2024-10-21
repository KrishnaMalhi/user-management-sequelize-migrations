const AuthenticationDBQuery = require("../queries/authentication.query");
const JwtUtils = require("../utils/jwtUtils");
const logger = require("../utils/loggerUtils");
const CommonUtils = require("../utils/commonUtils");

const login = async (email, password) => {
  logger.info("IN -  login service!");
  try {
    const user = { email };
    const userInfo = await AuthenticationDBQuery.login(email);
    console.log(userInfo)
    const authenticatedPassword = CommonUtils.bcryptEncryptionComparision(
      userInfo.password,
      password
    );
    if (userInfo && authenticatedPassword) {
      const token = JwtUtils.signJWTToken(user);

      logger.info("OUT -  login service!");
      return {
        token: token.token,
        expiresIn: token.expiresIn,
        userData: userInfo,
      };
    }
  } catch (err) {
    logger.error("error in login service", err.message);
    throw new Error("err in login service", err.message);
  }
};

module.exports = {
  login,
};
