const ResponseUtils = require("../utils/responseUtils");
const UsersDBQuery = require("../queries/users.query");
const RolesDBQuery = require("../queries/roles.query");
const CommonUtils = require("../utils/commonUtils");
const { ErrorCodes, SuccessCodes } = require("../utils/responseCodesUtils");
const {
  ErrorMessage,
  SuccessMessages,
} = require("../utils/responseMessagesUtils");
const logger = require("../utils/loggerUtils");

const createUser = async (req, res) => {
  try {
    logger.info("IN - createUser controller!");

    const {
      name,
      username,
      desgination,
      city,
      country,
      phone,
      email,
      password,
      role_id,
    } = req.body;

    const user = await UsersDBQuery.getUserByEmail(email);
    if (user) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.USER_ALREADY_EXISTS,
        ErrorCodes.USER_ALREADY_EXISTS
      );
    }

    const phoneExist = await UsersDBQuery.getUserByPhone(phone);
    if (phoneExist) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.PHONE_ALREADY_EXISTS,
        ErrorCodes.PHONE_ALREADY_EXISTS
      );
    }

    const isRoleExist = await RolesDBQuery.getRoleById(role_id);
    if (!isRoleExist) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    const hashedPassword = await CommonUtils.bcryptEncryption(password);
    const response = await UsersDBQuery.createUser(
      name,
      username,
      desgination,
      city,
      country,
      phone,
      email,
      hashedPassword,
      role_id
    );

    logger.info("OUT - createUser controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.USER_CREATED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - createUser controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllUsers = async (req, res) => {
  logger.info("IN - getAllUsers controller!");
  try {
    const response = await UsersDBQuery.getAllUsers();

    logger.info("OUT - getAllUsers controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getAllUsers controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getUserByEmail = async (req, res) => {
  logger.info("IN - getUserByEmail controller!");
  try {
    const { email } = req.body;
    const response = await UsersDBQuery.getUserByEmail(email);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND
      );
    }

    logger.info("OUT - getUserByEmail controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getUserByEmail controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getUserByPhone = async (req, res) => {
  logger.info("IN - getUserByPhone controller!");

  try {
    const { phone } = req.body;
    const response = await UsersDBQuery.getUserByPhone(phone);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND
      );
    }

    logger.info("OUT - getUserByPhone controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getUserByPhone controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getUserById = async (req, res) => {
  logger.info("IN - getUserById controller!");

  try {
    const { id } = req.body;
    const response = await UsersDBQuery.getUserById(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND
      );
    }

    logger.info("OUT - getUserById controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getUserById controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const deleteUser = async (req, res) => {
  logger.info("IN - deleteUser controller!");
  try {
    const { id } = req.body;
    const response = await UsersDBQuery.deleteUser(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND
      );
    }

    logger.info("OUT - deleteUser controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.USER_DELETED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - deleteUser controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserByPhone,
  getUserById,
  deleteUser,
};
