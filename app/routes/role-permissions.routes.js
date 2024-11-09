const express = require("express");
const router = express.Router();
const RolePermissionsController = require("../controllers/role-permissions.controller");
const AuthenticationMiddleware = require("../middlewares/authentication");

router.post(
  "/create-role-permissions",
  AuthenticationMiddleware.verifyToken,
  RolePermissionsController.createRolePermissions
);

router.get(
  "/get-all-roles-permissions",
  AuthenticationMiddleware.verifyToken,
  RolePermissionsController.getAllRolesPermissions
);

router.get(
  "/get-all-permissions-against-role",
  AuthenticationMiddleware.verifyToken,
  RolePermissionsController.getAllPermissionsAgainstRole
);

router.get(
  "/get-all-roles-permissions-group-by-role",
  AuthenticationMiddleware.verifyToken,
  RolePermissionsController.getAllRolesPermissionsGroupByRole
);

router.get(
  "/get-role-permissions-by-id",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateGetRoleById,
  RolePermissionsController.getRolePermissionsById
);

router.patch(
  "/update-role-permissions",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateGetRoleById,
  RolePermissionsController.updateRolePermissions
);

router.delete(
  "/delete-role-permissions",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateGetRoleById,
  RolePermissionsController.deleteRolePermissions
);

module.exports = router;
