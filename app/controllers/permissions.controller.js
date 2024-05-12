const PermissionsDBQuery = require("../queries/permissions.query");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const { ErrorMessage } = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");
const logger = require("../utils/loggerUtils");

const createPermission = async (req, res) => {
  logger.info("IN - createPermission controller!");
  try {
    const {
      name,
      label,
      menu_label,
      page_url,
      // parent_id,
      type,
      descirption,
    } = req.body;
    const response = await PermissionsDBQuery.createPermission(
      name,
      label,
      menu_label,
      page_url,
      // parent_id,
      type,
      descirption,
    );
    logger.info("OUT - createPermission controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    logger.error("Error - createPermission controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllPermissions = async (req, res) => {
  logger.info("IN - getAllPermissions controller!");
  try {
    const response = await PermissionsDBQuery.getAllPermissions();
    logger.info("OUT - getAllPermissions controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    logger.error("Error - createPermission controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getPermissionById = async (req, res) => {
  logger.info("IN - getPermissionById controller!");
  try {
    const { id } = req.body;
    const response = await PermissionsDBQuery.getPermissionById(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.PERMISSION_NOT_FOUND,
        ErrorCodes.PERMISSION_NOT_FOUND
      );
    }

    logger.info("OUT - getPermissionById controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getPermissionById controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
};
