const express = require("express");
const router = express.Router();
const RolePermissionsController = require("../controllers/role-permissions.controller");

// Route to assign permissions to a role
router.post("/asign-permissions-to-role", RolePermissionsController.assignPermissionsToRole);

// Route to fetch permissions assigned to a role
// router.get("/roles/:roleId/permissions", RolePermissionsController.getPermissionsByRole);

module.exports = router;
