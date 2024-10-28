const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/permissions.controller");
// const ValidationMiddleware = require("../middlewares/validationMiddleware");
const AuthenticationMiddleware = require("../middlewares/authentication");

router.post(
  "/create-permission",
  //   ValidationMiddleware.validateCreatePermission,
  // AuthenticationMiddleware.verifyToken,
  PermissionController.createPermission
);

router.get(
  "/get-all-permissions",
  // AuthenticationMiddleware.verifyToken,
  PermissionController.getAllPermissions
);

router.get(
  "/get-all-parent-permissions",
  // AuthenticationMiddleware.verifyToken,
  PermissionController.getAllParentPermissions
);

router.get(
  "/get-permission-by-id",
  //   ValidationMiddleware.validateGetPermissionById,
  // AuthenticationMiddleware.verifyToken,
  PermissionController.getPermissionById
);

router.patch(
  "/update-permission",
  //   ValidationMiddleware.validateCreatePermission,
  // AuthenticationMiddleware.verifyToken,
  PermissionController.updatePermission
);

router.delete(
  "/delete-permission",
  //   ValidationMiddleware.validateGetPermissionById,
  // AuthenticationMiddleware.verifyToken,
  PermissionController.deletePermission
);

module.exports = router;
