const RolesDBQurey = require("../queries/roles.query");
const logger = require("../utils/loggerUtils");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const { ErrorMessage } = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");

const createRole = async (req, res) => {
  logger.info("IN - createRole controller!");
  try {
    const { name, label, description } = req.body;
    const response = await RolesDBQurey.createRole(name, label, description);
    logger.info("OUT - createRole controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllRoles = async (req, res) => {
  logger.info("IN - getAllRoles controller!");
  try {
    const response = await RolesDBQurey.getAllRoles();
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
    const response = await RolesDBQurey.getRoleById(id);
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

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
};
