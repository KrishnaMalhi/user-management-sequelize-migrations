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
    // const token = req.cookies.authToken; // Get token from cookies
    // console.log("cookies: ", token);
    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

    const {
      name,
      username,
      city,
      country,
      phone,
      email,
      password,
      // role,
      role_id,
    } = req.body;

    const userExists = await UsersDBQuery.getUserByEmail(email);
    if (userExists) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.USER_ALREADY_EXISTS,
        ErrorCodes.USER_ALREADY_EXISTS
      );
    }

    // check role against role_id
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

    const hashedPassword = CommonUtils.bcryptEncryption(password);
    const response = await UsersDBQuery.createUser(
      name,
      username,
      city,
      country,
      phone,
      email,
      hashedPassword,
      // role
      role_id
    );

    logger.info("OUT - createUser controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      response,
      SuccessMessages.USER_REGISTERED_SUCCESSFULLY,
      true,
      SuccessCodes.USER_REGISTERED_SUCCESSFULLY
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
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

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
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

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

const getUserById = async (req, res) => {
  logger.info("IN - getUserById controller!");

  try {
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

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
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

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

    return ResponseUtils.sendResponse(res, req, {}, "success", true, 200);
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
  getUserById,
  deleteUser,
};
