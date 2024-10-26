const AuthenticationDBQuery = require("../queries/authentication.query");
const logger = require("../utils/loggerUtils");
const ResponseUtils = require("../utils/responseUtils");
const UsersDBQuery = require("../queries/users.query");
const commonUtils = require("../utils/commonUtils");
const { SuccessCodes, ErrorCodes } = require("../utils/responseCodesUtils");
const {
  SuccessMessages,
  ErrorMessage,
} = require("../utils/responseMessagesUtils");
const JwtUtils = require("../utils/jwtUtils");

const login = async (req, res) => {
  logger.info("IN -  login controller!");
  try {
    const { email, password } = req.body;
    // const token = await AuthenticationServices.login(email, password);
    const user = await AuthenticationDBQuery.login(email, password);
    console.log(user);
    if (!user) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.INVALID_USER,
        ErrorCodes.INVALID_USER
      );
    }

    const authenticatedPassword = commonUtils.bcryptEncryptionComparision(
      user.password,
      password
    );
    console.log(authenticatedPassword);
    if (!authenticatedPassword) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.INVALID_USER,
        ErrorCodes.INVALID_USER
      );
    }
    const { password: excludedPassword, ...response } = user;
    //JWT Token
    const token = JwtUtils.signJWTToken(user);
    res.setHeader("authorization", `Bearer ${token}`);
    // res.cookie("authToken", token, {
    //   httpOnly: true, // Prevents JavaScript access
    //   secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
    //   sameSite: "strict", // CSRF protection
    //   maxAge: 3600000, // 1 hour (1h = 3600000 ms)
    //   path: "http://127.0.0.1:5000/dashboard",
    // });

    // logger.info("token send succesfully");

    req.user = {
      email,
    };

    return ResponseUtils.sendResponse(
      res,
      req,
      response,
      SuccessMessages.USER_LOGIN_SUCCESSFULLY,
      true,
      SuccessCodes.USER_LOGIN_SUCCESSFULLY
    );
  } catch (err) {
    logger.error("Error", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const logout = (req, res) => {
  logger.info("IN -  logout controller!");
  res.setHeader("authorization", "");
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  logger.info("OUT -  logout controller!");
  return ResponseUtils.sendResponse(res, req, {}, "success", true, 200);
};

const register = async (req, res) => {
  logger.info("IN -  register controller!");
  try {
    // const { name, username, phone, email, password, country, city } = req.body;
    const { name, username, phone, email, country, city } = req.body;

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

    //check role against role_id
    // const isRoleExist = await RolesDBQuery.getRoleById(role);
    // if (!isRoleExist) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.ROLE_NOT_FOUND,
    //     ErrorCodes.ROLE_NOT_FOUND
    //   );
    // }

    // const hashedPassword = commonUtils.bcryptEncryption(password);
    const response = await AuthenticationDBQuery.register(
      name,
      username,
      phone,
      email,
      // hashedPassword
      country,
      city
    );
    // const token = JwtUtils.signJWTToken(response);
    // console.log(token);
    // res.setHeader("authorization", `Bearer ${token}`);
    // res.cookie("authToken", token, {
    //   httpOnly: true, // Prevents JavaScript access
    //   secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
    //   sameSite: "strict", // CSRF protection
    //   maxAge: 3600000, // 1 hour (1h = 3600000 ms)
    //   path: "http://127.0.0.1:5000/dashboard",
    // });

    logger.info("OUT -  register controller!");

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
const createPassword = async (req, res) => {
  logger.info("IN -  createPassword controller!");
  try {
    const { email, password } = req.body;

    const userExists = await UsersDBQuery.getUserByEmail(email);
    if (!userExists) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND
      );
    }

    const hashedPassword = commonUtils.bcryptEncryption(password);
    const response = await AuthenticationDBQuery.createPassword(
      email,
      hashedPassword
    );

    logger.info("OUT -  createPassword controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.PASSWORD_CREATED_SUCCESSFULLY,
      true,
      SuccessCodes.PASSWORD_CREATED_SUCCESSFULLY
    );
  } catch (err) {
    logger.error("Error", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};
module.exports = {
  login,
  logout,
  register,
  createPassword,
};
