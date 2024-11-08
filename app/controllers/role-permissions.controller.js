const RolesDBQuery = require("../queries/roles.query");
const RolesPermissionsDBQuery = require("../queries/role-permissions.query");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const {
  ErrorMessage,
  SuccessMessages,
} = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");
const logger = require("../utils/loggerUtils");

const createRolePermissions = async (req, res) => {
  logger.info("IN - createRolePermissions controller!");
  try {
    const { roleId, roleDescription, rolePermissions } = req.body;
    const roleExists = await RolesDBQuery.getRoleById(roleId);
    if (!roleExists) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }
    const createdPermissions = await Promise.all(
      rolePermissions.map(async (permission) => {
        return RolesPermissionsDBQuery.createRolePermissions({
          role_id: roleId,
          permission_id: permission.permissionId,
          is_create: permission.rights.Create ? 1 : 0,
          is_read: permission.rights.View ? 1 : 0,
          is_update: permission.rights.Edit ? 1 : 0,
          is_delete: permission.rights.Delete ? 1 : 0,
          description: roleDescription,
        });
      })
    );

    logger.info("OUT - createRolePermissions controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.PERMISSIONS_ASSIGNED_TO_ROLE_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createRolePermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllRolesPermissions = async (req, res) => {
  logger.info("IN - getAllRolesPermissions controller!");
  try {
    const response = await RolesPermissionsDBQuery.getAllRolesPermissions();
    logger.info("OUT - getAllRolesPermissions controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("Error - getAllRolesPermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllPermissionsAgainstRole = async (req, res) => {
  logger.info("IN - getAllPermissionsAgainstRole controller!");
  try {
    const { role_id } = req.query;
    const roleExists = await RolesDBQuery.getRoleById(role_id);
    if (!roleExists) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }
    const permissions =
      await RolesPermissionsDBQuery.getAllPermissionsAgainstRole(role_id);
    const response = permissions.map((permission) => ({
      isCreate: permission.is_create,
      isRead: permission.is_read,
      isDelete: permission.is_delete,
      isEdit: permission.is_update,
      id: permission["permission.id"],
      label: permission["permission.label"],
      page_url: permission["permission.page_url"],
      parent_id: permission["permission.parent_id"],
      status: permission["permission.status"],
      type: permission["permission.type"],
    }));
    logger.info("OUT - getAllPermissionsAgainstRole controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error(
      "Error - getAllPermissionsAgainstRole controller: ",
      err.message
    );
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllRolesPermissionsGroupByRole = async (req, res) => {
  logger.info("IN - getAllRolesPermissionsGroupByRole controller!");
  try {
    const rolePermissions =
      await RolesPermissionsDBQuery.getAllRolesPermissionsGroupByRole();

    // Transform response to desired structure
    const groupedPermissions = rolePermissions.reduce((result, item) => {
      const roleId = item["role.id"];

      // Initialize the role object if it doesn't exist in the result
      if (!result[roleId]) {
        result[roleId] = {
          id: item.id,
          description: item.description,
          created_at: item.created_at,
          updated_at: item.updated_at,
          role: {
            id: item["role.id"],
            value: item["role.value"],
            label: item["role.label"],
            description: item["role.description"],
            status: item["role.status"],
            createdAt: item["role.created_at"],
            updatedAt: item["role.updated_at"],
            permissions: [],
          },
        };
      }

      // Add permission details to the role's permissions array
      result[roleId].role.permissions.push({
        id: item["permission.id"],
        value: item["permission.value"],
        label: item["permission.label"],
        page_url: item["permission.page_url"],
        parent_id: item["permission.parent_id"],
        type: item["permission.type"],
        description: item["permission.description"],
        status: item["permission.status"],
        created_at: item["permission.created_at"],
        updated_at: item["permission.updated_at"],
        isCreate: item.is_create,
        isRead: item.is_read,
        isUpdate: item.is_update,
        isDelete: item.is_delete,
      });

      return result;
    }, {});

    // Convert groupedPermissions object to an array
    const response = Object.values(groupedPermissions);

    logger.info("OUT - getAllRolesPermissionsGroupByRole controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error(
      "Error - getAllRolesPermissionsGroupByRole controller: ",
      err.message
    );
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getRolePermissionsById = async (req, res) => {
  logger.info("IN - getRolePermissionsById controller!");
  try {
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
    const response = await RolesDBQuery.updateRolePermissions(
      id,
      value,
      label,
      description
    );
    logger.info("OUT - updateRolePermissions controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.ROLE_PERMISSIONS_UPDATED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log(err);
    logger.error("ERROR - updateRolePermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const deleteRolePermissions = async (req, res) => {
  logger.info("IN - deleteRolePermissions controller!");
  try {
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

    return ResponseUtils.sendResponse(
      res,
      req,
      {},
      SuccessMessages.ROLE_PERMISSIONS_DELETED_SUCCESSFULLY,
      true,
      200
    );
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - deleteRolePermissions controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  createRolePermissions,
  getAllRolesPermissions,
  getAllPermissionsAgainstRole,
  getAllRolesPermissionsGroupByRole,
  getRolePermissionsById,
  updateRolePermissions,
  deleteRolePermissions,
};
