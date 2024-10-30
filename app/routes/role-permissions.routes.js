const express = require("express");
const router = express.Router();
const RolePermissionsController = require("../controllers/role-permissions.controller");

router.post(
  "/create-role-permissions",
  RolePermissionsController.createRolePermissions
);

router.get(
  "/get-all-roles-permissions",
  RolePermissionsController.getAllRolesPermissions
);

router.get(
  "/get-role-permissions-by-id",
  //   ValidationMiddleware.validateGetRoleById,
  RolePermissionsController.getRolePermissionsById
);

router.patch(
  "/update-role-permissions",
  //   ValidationMiddleware.validateGetRoleById,
  // AuthenticationMiddleware.verifyToken,
  RolePermissionsController.updateRolePermissions
);

router.delete(
  "/delete-role-permissions",
  //   ValidationMiddleware.validateGetRoleById,
  RolePermissionsController.deleteRolePermissions
);

router.post(
  "/assign-permissions-to-role",
  RolePermissionsController.assignPermissionsToRole
);

module.exports = router;
