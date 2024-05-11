const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/permissions.controller");
// const ValidationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/create-permission",
//   ValidationMiddleware.validateCreatePermission,
  PermissionController.createPermission
);
router.get(
  "/get-all-permissions",
  PermissionController.getAllPermissions
);
router.get(
  "/get-permission-by-id",
//   ValidationMiddleware.validateGetPermissionById,
  PermissionController.getPermissionById
);

module.exports = router;
