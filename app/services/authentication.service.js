const AuthenticationDBQuery = require("../querie/authentication.query");
const JwtUtils = require("../utils/jwtUtils");
const logger = require("../utils/loggerUtils");
const CommonUtils = require("../utils/commonUtils");

const userAuthentication = async (email, password) => {
  logger.info("IN -  userAuthentication service!");
  try {
    const user = { email };
    const isAuthenticatedUser = await AuthenticationDBQuery.userAuthentication(
      email
    );
    const authenticatedPassword = CommonUtils.bcryptEncryptionComparision(
      isAuthenticatedUser.password,
      password
    );
    if (isAuthenticatedUser && authenticatedPassword) {
      const token = JwtUtils.signJWTToken(user);
      logger.info("OUT -  userAuthentication service!");
      return {
        token: token.token,
        expiresIn: token.expiresIn,
        userData: isAuthenticatedUser,
      };
    }
  } catch (err) {
    logger.error("error in userAuthentication service", err.message);
    throw new Error("err in userAuthentication service", err.message);
  }
};

module.exports = {
  userAuthentication,
};
