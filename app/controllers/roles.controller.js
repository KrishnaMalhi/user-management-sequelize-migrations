const RolesDBQuery = require("../queries/roles.query");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const {
  ErrorMessage,
  SuccessMessages,
} = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");
const logger = require("../utils/loggerUtils");

const createRole = async (req, res) => {
  logger.info("IN - createRole controller!");
  try {
    const { value, label, description } = req.body;
    const isRoleExists = await RolesDBQuery.getRoleByValueAndLabel(
      value,
      label
    );
    if (isRoleExists) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_ALREADY_EXISTS,
        ErrorCodes.ROLE_ALREADY_EXISTS
      );
    }

    const response = await RolesDBQuery.createRole(value, label, description);

    logger.info("OUT - createRole controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.ROLE_CREATED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllRoles = async (req, res) => {
  logger.info("IN - getAllRoles controller!");
  try {
    const response = await RolesDBQuery.getAllRoles();
    logger.info("OUT - getAllRoles controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("Error - getAllRoles controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getRoleById = async (req, res) => {
  logger.info("IN - getRoleById controller!");
  try {
    const { id } = req.body;
    const response = await RolesDBQuery.getRoleById(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    logger.info("OUT - getRoleById controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getRoleById controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getRoleByValueAndLabel = async (req, res) => {
  logger.info("IN - getRoleByValueAndLabel controller!");
  try {
    const { value, label } = req.body;
    const response = await RolesDBQuery.getRoleByValueAndLabel(value, label);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    logger.info("OUT - getRoleByValueAndLabel controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getRoleByValueAndLabel controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const updateRole = async (req, res) => {
  logger.info("IN - updateRole controller!");
  try {
    const { id, value, label, description } = req.body;
    const isExist = await RolesDBQuery.getRoleById(id);
    if (!isExist) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }
    const response = await RolesDBQuery.updateRole(
      id,
      value,
      label,
      description
    );
    logger.info("OUT - updateRole controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.ROLE_UPDATED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log(err);
    logger.error("ERROR - updateRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const deleteRole = async (req, res) => {
  logger.info("IN - deleteRole controller!");
  try {
    const { id } = req.body;
    const response = await RolesDBQuery.deleteRole(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    logger.info("OUT - deleteRole controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.ROLE_DELETED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - deleteRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  getRoleByValueAndLabel,
  updateRole,
  deleteRole,
};
