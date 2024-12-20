const db = require("../config/models");
const logger = require("../utils/loggerUtils");

const login = async (email) => {
  logger.info("IN - login Database query!");
  try {
    let userExist = await db.Users.findOne({
      where: { email },
      include: [
        {
          model: db.Roles,
          as: "role",
        },
      ],
      // attributes: { exclude: ["role_id"] },
      // raw: true,
    });
    logger.info("OUT - login Database query!");
    if (userExist) return userExist.toJSON();

    return false;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - login Database query: ", err.message);
    throw new Error("ERROR - login Database query: ", err.message);
  }
};

const register = async (name, username, phone, email, country, city) => {
  logger.info("IN - register Database query!");
  try {
    const response = await db.Users.create({
      name,
      username,
      phone,
      email,
      country,
      city,
      created_at: new Date(),
    });

    const { password: excludedPassword, ...user } = response.toJSON();
    logger.info("OUT - register Database query!");
    return user;
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - register Database query: ", err.message);
    throw new Error("ERROR - register Database query: ", err);
  }
};

const createPassword = async (email, password) => {
  logger.info("IN - createPassword Database query!");
  try {
    const response = await db.Users.update(
      { password },
      {
        where: {
          email,
        },
      }
    );

    logger.info("OUT - createPassword Database query!");
    return response;
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - createPassword Database query: ", err.message);
    throw new Error("ERROR - createPassword Database query: ", err);
  }
};

module.exports = { login, register, createPassword };
