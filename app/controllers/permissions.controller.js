const PermissionsDBQuery = require("../queries/permissions.query");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const {
  ErrorMessage,
  SuccessMessages,
} = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");
const logger = require("../utils/loggerUtils");

const createPermission = async (req, res) => {
  logger.info("IN - createPermission controller!");
  try {
    let { value, label, page_url, parent_id, type, description } = req.body;

    if (parent_id && type === "child") {
      const isParentExists = await PermissionsDBQuery.getPermissionById(
        parent_id
      );
      if (!isParentExists) {
        return ResponseUtils.sendError(
          res,
          req,
          {},
          ErrorMessage.PERMISSION_NOT_FOUND,
          ErrorCodes.PERMISSION_NOT_FOUND
        );
      }
    }
    if (parent_id && type === "parent") {
      parent_id = null;
    }
    const response = await PermissionsDBQuery.createPermission(
      value,
      label,
      page_url,
      parent_id,
      type,
      description
    );
    logger.info("OUT - createPermission controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.PERMISSION_CREATED_SUCCESSFULLY,
      true,
      200
    );
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
    logger.error("Error - getAllPermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllPermissionsGroupByType = async (req, res) => {
  logger.info("IN - getAllPermissionsGroupByType controller!");
  try {
    const response = await PermissionsDBQuery.getAllPermissionsGroupByType();
    // Organize permissions into a parent-child structure
    const permissionsMap = {};
    const groupedPermissions = [];

    // Step 1: Initialize all permissions in the map
    response.forEach((permission) => {
      permissionsMap[permission.id] = { ...permission, children: [] };
    });

    // Step 2: Build the parent-child relationships
    response.forEach((permission) => {
      if (permission.parent_id) {
        // Add as child if it has a parent_id
        if (permissionsMap[permission.parent_id]) {
          permissionsMap[permission.parent_id].children.push(
            permissionsMap[permission.id]
          );
        }
      } else {
        // If it has no parent_id, it's a top-level permission
        groupedPermissions.push(permissionsMap[permission.id]);
      }
    });
    logger.info("OUT - getAllPermissionsGroupByType controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      groupedPermissions,
      "success",
      true,
      200
    );
  } catch (err) {
    logger.error(
      "Error - getAllPermissionsGroupByType controller: ",
      err.message
    );
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllParentPermissions = async (req, res) => {
  logger.info("IN - getAllParentPermissions controller!");
  try {
    const response = await PermissionsDBQuery.getAllParentPermissions();
    logger.info("OUT - getAllParentPermissions controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    logger.error("Error - getAllParentPermissions controller: ", err.message);
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

const updatePermission = async (req, res) => {
  logger.info("IN - updatePermission controller!");
  try {
    const { id, value, label, page_url, parent_id, type, description } =
      req.body;
    const isPermissionExists = await PermissionsDBQuery.getPermissionById(id);
    if (!isPermissionExists) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.PERMISSION_NOT_FOUND,
        ErrorCodes.PERMISSION_NOT_FOUND
      );
    }
    if (parent_id) {
      const isParentExists = await PermissionsDBQuery.getPermissionById(
        parent_id
      );
      if (!isParentExists) {
        return ResponseUtils.sendError(
          res,
          req,
          {},
          ErrorMessage.PERMISSION_NOT_FOUND,
          ErrorCodes.PERMISSION_NOT_FOUND
        );
      }
    }

    const response = await PermissionsDBQuery.updatePermission(
      id,
      value,
      label,
      page_url,
      parent_id,
      type,
      description
    );
    logger.info("OUT - updatePermission controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.PERMISSION_UPDATED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    logger.error("Error - updatePermission controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const deletePermission = async (req, res) => {
  logger.info("IN - deletePermission controller!");
  try {
    const { id } = req.body;
    const response = await PermissionsDBQuery.deletePermission(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.PERMISSION_NOT_FOUND,
        ErrorCodes.PERMISSION_NOT_FOUND
      );
    }

    logger.info("OUT - deletePermission controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.PERMISSION_DELETED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - deletePermission controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getAllPermissionsGroupByType,
  getAllParentPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
