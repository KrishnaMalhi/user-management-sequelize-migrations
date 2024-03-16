const db = require("../config/models/users");
const logger = require("../utils/loggerUtils");

const userAuthentication = async (email) => {
  logger.info("IN - userAuthentication Database query!");
  try {
    let userExist = await db.User.findOne({
      where: { email },
      // raw: true,
      include: [
        {
          model: db.Role,
        },
      ],
      attributes: {
        exclude: ["password", "remember_token", "wrong_password_attempts"],
      },
    });
    logger.info("OUT - userAuthentication Database query!");
    if (userExist) return userExist;

    return false;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - userAuthentication Database query: ", err.message);
    throw new Error("ERROR - userAuthentication Database query: ", err.message);
  }
};

module.exports = { userAuthentication };
