const RolesDBQuery = require("../queries/roles.query");
const PermissionsDBQuery = require("../queries/permissions.query");
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

    const isRoleExist = await RolesPermissionsDBQuery.getRolePermissionByRoleId(
      roleId
    );
    if (roleExists) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.PERMISSIONS_AGAINST_ROLE_ALREADY_EXISTS,
        ErrorCodes.PERMISSIONS_AGAINST_ROLE_ALREADY_EXISTS
      );
    }

    const createdRolePermissions = await Promise.all(
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

    // Fetch permissions with associated role permissions data
    const permissions =
      await RolesPermissionsDBQuery.getAllPermissionsAgainstRole(role_id);

    // Organize permissions into a map for easy lookup
    const permissionMap = [];
    const groupedPermissions = [];
    const setOfParentIds = new Set();

    permissions.forEach((permission) => {
      const formattedPermission = {
        id: permission["permission.id"],
        value: permission["permission.label"],
        label: permission["permission.label"],
        page_url: permission["permission.page_url"],
        parent_id: permission["permission.parent_id"],
        type: permission["permission.type"],
        description: permission.description,
        status: permission["permission.status"],
        created_at: permission.created_at,
        updated_at: permission.updated_at,
        isCreate: permission.is_create,
        isRead: permission.is_read,
        isDelete: permission.is_delete,
        isEdit: permission.is_update,
        children: [], // Initialize empty children array
      };
      permissionMap.push(formattedPermission);
      setOfParentIds.add(permission["permission.parent_id"]);
    });

    // Convert the Set into an array for mapping and use Promise.all
    const parentPromises = Array.from(setOfParentIds).map(async (parentId) => {
      const dbParentPermission = await PermissionsDBQuery.getPermissionById(
        parentId
      );
      if (!dbParentPermission) return null;

      const parentPermission = { ...dbParentPermission, children: [] };

      const childPermissions = permissionMap.filter(
        (permission) => permission.parent_id === parentPermission.id
      );

      parentPermission.children.push(...childPermissions);

      return parentPermission;
    });

    // Wait for all the parent permissions to be processed
    const resolvedPermissions = await Promise.all(parentPromises);

    // Filter out any null values (if a parent permission was not found)
    const validGroupedPermissions = resolvedPermissions.filter(Boolean);

    // Add the top-level permissions (permissions with no parent_id)
    const topLevelPermissions = permissionMap.filter(
      (permission) => permission.parent_id === null
    );
    groupedPermissions.push(...topLevelPermissions);

    // Add grouped parent permissions with their children
    groupedPermissions.push(...validGroupedPermissions);

    // After processing all permissions, check the final structure

    logger.info("OUT - getAllPermissionsAgainstRole controller!");

    return ResponseUtils.sendResponse(
      res,
      req,
      groupedPermissions,
      "success",
      true,
      200
    );
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
          status: item.status === 1 ? true : false,
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
    const { id, roleId, roleDescription, rolePermissions } = req.body;
    const isRoleExist = await RolesDBQuery.getRoleById(roleId);
    if (!isRoleExist) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    const updatedRolePermissions = await Promise.all(
      rolePermissions.map(async (permission) => {
        const isPermissionExists = await PermissionsDBQuery.getPermissionById(
          permission.permissionId
        );
        if (!isPermissionExists) {
          return ResponseUtils.sendError(
            res,
            req,
            {},
            ErrorMessage.PERMISSION_NOT_FOUND,
            ErrorCodes.PERMISSION_NOT_FOUND
          );
        }

        const isRolePermissionExist =
          await RolesPermissionsDBQuery.getRolePermissionByRoleAndPermissionId(
            roleId,
            permission.permissionId
          );

        // Check if all rights are set to 0 (i.e., Create, View, Edit, Delete are all 0)
        const noPermissions =
          !permission.rights.Create &&
          !permission.rights.View &&
          !permission.rights.Edit &&
          !permission.rights.Delete;

        if (noPermissions) {
          // Delete the role permission if it exists and all rights are 0
          if (isRolePermissionExist) {
            await RolesPermissionsDBQuery.deleteRolePermissionByRoleAndPermissionId(
              roleId,
              permission.permissionId
            );
          }
          // Skip the rest of the logic as the record is deleted
          return null;
        }

        if (isRolePermissionExist) {
          // Update the existing permission
          return RolesPermissionsDBQuery.updateRolePermissions({
            // id: id,
            role_id: roleId,
            permission_id: permission.permissionId,
            is_create: permission.rights.Create ? 1 : 0,
            is_read: permission.rights.View ? 1 : 0,
            is_update: permission.rights.Edit ? 1 : 0,
            is_delete: permission.rights.Delete ? 1 : 0,
            description: roleDescription,
          });
        } else {
          // Insert a new permission if not present
          return RolesPermissionsDBQuery.createRolePermissions({
            role_id: roleId,
            permission_id: permission.permissionId,
            is_create: permission.rights.Create ? 1 : 0,
            is_read: permission.rights.View ? 1 : 0,
            is_update: permission.rights.Edit ? 1 : 0,
            is_delete: permission.rights.Delete ? 1 : 0,
            description: roleDescription,
          });
        }
      })
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
    const { role_id } = req.body;
    const response = await RolesPermissionsDBQuery.deleteRolePermissions(
      role_id
    );
    if (response === 0) {
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
