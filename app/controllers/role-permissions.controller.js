const PermissionsDBQuery = require("../queries/permissions.query");
const RolesDBQuery = require("../queries/roles.query");
const RolePermissionsDBQuery = require("../queries/role-permissions.query");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const { ErrorMessage } = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");
const logger = require("../utils/loggerUtils");

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
  assignPermissionsToRole,
};
