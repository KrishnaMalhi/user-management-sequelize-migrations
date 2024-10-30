const PermissionsDBQuery = require("../queries/permissions.query");
const RolesDBQuery = require("../queries/roles.query");
const RolesPermissionsDBQuery = require("../queries/role-permissions.query");
const RolePermissionsDBQuery = require("../queries/role-permissions.query");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const { ErrorMessage } = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");
const logger = require("../utils/loggerUtils");

const createRolePermissions = async (req, res) => {
  logger.info("IN - createRolePermissions controller!");
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

    const { name, label, description } = req.body;
    const response = await RolesDBQuery.createRolePermissions(
      name,
      label,
      description
    );
    logger.info("OUT - createRolePermissions controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createRolePermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllRolesPermissions = async (req, res) => {
  logger.info("IN - getAllRolesPermissions controller!");
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

    const response = await RolesPermissionsDBQuery.getAllRolesPermissions();
    logger.info("OUT - getAllRolesPermissions controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("Error - getAllRolesPermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getRolePermissionsById = async (req, res) => {
  logger.info("IN - getRolePermissionsById controller!");
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
    const response = await RolesDBQuery.getRolePermissionsById(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    logger.info("OUT - getRolePermissionsById controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getRolePermissionsById controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const updateRolePermissions = async (req, res) => {
  logger.info("IN - updateRolePermissions controller!");
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

    const { id, name, label, description } = req.body;
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
    const response = await RolesDBQuery.updateRolePermissions(
      id,
      name,
      label,
      description
    );
    logger.info("OUT - updateRolePermissions controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("ERROR - updateRolePermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const deleteRolePermissions = async (req, res) => {
  logger.info("IN - deleteRolePermissions controller!");
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
    const response = await RolesDBQuery.deleteRolePermissions(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    logger.info("OUT - deleteRolePermissions controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - deleteRolePermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const assignPermissionsToRole = async (req, res) => {
  logger.info("IN - assignPermissionsToRole controller!");
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

    const { role, permissions } = req.body;

    // Check if the role exists
    const isRoleExist = await RolesDBQuery.getRoleById(role);
    if (!isRoleExist) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    // Iterate over the permissions array and assign each permission to the role
    await Promise.all(
      permissions.map(async (perm) => {
        const {
          permission,
          isCreate,
          isRead,
          isUpdate,
          isDelete,
          code,
          description,
        } = perm;

        // Check if the permission exists
        const isPermissionExist = await PermissionsDBQuery.getPermissionById(
          permission
        );
        if (!isPermissionExist) {
          throw new Error(ErrorMessage.PERMISSION_NOT_FOUND);
        }

        // Assign the permission to the role
        await RolePermissionsDBQuery.assignPermissionsToRole(
          role,
          permission,
          isCreate,
          isRead,
          isUpdate,
          isDelete,
          code,
          description
        );
      })
    );

    logger.info("OUT - assignPermissionsToRole controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      "Permissions assigned to role successfully",
      true,
      200
    );
  } catch (err) {
    logger.error("Error - assignPermissionsToRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  createRolePermissions,
  getAllRolesPermissions,
  getRolePermissionsById,
  updateRolePermissions,
  deleteRolePermissions,
  assignPermissionsToRole,
};
