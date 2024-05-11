const db = require("../config/models");
const logger = require("../utils/loggerUtils");

const createUser = async (
  name,
  username,
  mobile_number,
  email,
  password,
  role
) => {
  logger.info("IN - createUser Database query!");
  try {
    const response = await db.Users.create({
      name,
      username,
      mobile_number,
      email,
      password,
      created_at: new Date(),
      role,
    });

    const { password: excludedPassword, ...user } = response.toJSON();
    logger.info("OUT - createUser Database query!");
    return user;
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - createUser Database query: ", err.message);
    throw new Error("ERROR - createUser Database query: ", err);
  }
};

const getAllUsers = async () => {
  logger.info("IN - getAllUsers Database query!");
  try {
    const response = await db.Users.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    logger.info("OUT - getAllUsers Database query!");
    return response;
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getAllUsers Database query: ", err.message);
    throw new Error("ERROR - getAllUsers Database query: ", err.message);
  }
};

const getUserByEmail = async (email) => {
  logger.info("IN - getUserByEmail Database query!");
  try {
    const response = await db.Users.findOne({
      where: { email },
      attributes: {
        exclude: ["password"],
      },
      // include: [
      //   {
      //     model: roles,
      //   },
      // ],
    });

    logger.info("OUT - getUserByEmail Database query!");
    return response;
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getUserByEmail Database query: ", err.message);
    throw new Error("ERROR - getUserByEmail Database query: ", err.message);
  }
};

const getUserById = async (id) => {
  logger.info("IN - getUserById Database query!");
  try {
    let response = await db.Users.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });

    logger.info("OUT - getUserById Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - getUserById Database query: ", err.message);
    throw new Error("ERROR - getUserById Database query: ", err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
};
