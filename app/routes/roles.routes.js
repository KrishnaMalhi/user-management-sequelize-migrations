const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/roles.controller");
const AuthenticationMiddleware = require("../middlewares/authentication");
// const ValidationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/create-role",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateCreateRole,
  RoleController.createRole
);
router.get(
  "/get-all-roles",
  AuthenticationMiddleware.verifyToken,
  RoleController.getAllRoles
);
router.get(
  "/get-role-by-id",
  //   ValidationMiddleware.validateGetRoleById,
  RoleController.getRoleById
);
router.patch(
  "/update-role",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateGetRoleById,
  // AuthenticationMiddleware.verifyToken,
  RoleController.updateRole
);
router.delete(
  "/delete-role",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateGetRoleById,
  RoleController.deleteRole
);

module.exports = router;
