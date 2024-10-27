const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/roles.controller");
// const ValidationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/create-role",
  //   ValidationMiddleware.validateCreateRole,
  RoleController.createRole
);
router.get("/get-all-roles", RoleController.getAllRoles);
router.get(
  "/get-role-by-id",
  //   ValidationMiddleware.validateGetRoleById,
  RoleController.getRoleById
);
router.delete(
  "/delete-role",
  //   ValidationMiddleware.validateGetRoleById,
  RoleController.deleteRole
);

module.exports = router;
