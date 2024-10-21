"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Retrieve roles and permissions to associate them
    const roles = await queryInterface.sequelize.query(`SELECT id FROM roles;`);
    const permissions = await queryInterface.sequelize.query(
      `SELECT id, name FROM permissions;`
    );

    const roleIds = roles[0];
    const permissionIds = permissions[0];

    console.log("Role IDs:", roleIds);
    console.log("Permission IDs:", permissionIds);

    // Create associations between roles and permissions
    const rolePermissions = [
      {
        id: uuidv4(),
        role_id: roleIds[0].id, // Assuming Admin role
        permission_id: permissionIds.find((p) => p.name === "All Users")?.id,
        is_create: 1, // Update to snake_case
        is_read: 1, // Update to snake_case
        is_update: 1, // Update to snake_case
        is_delete: 1, // Update to snake_case
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        role_id: roleIds[0].id, // Assuming Admin role
        permission_id: permissionIds.find((p) => p.name === "Roles Permissions")
          ?.id,
        is_create: 1, // Update to snake_case
        is_read: 1, // Update to snake_case
        is_update: 1, // Update to snake_case
        is_delete: 1, // Update to snake_case
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        role_id: roleIds[1].id, // Assuming User role
        permission_id: permissionIds.find((p) => p.name === "All Users")?.id,
        is_create: 0, // Update to snake_case
        is_read: 1, // Update to snake_case
        is_update: 0, // Update to snake_case
        is_delete: 0, // Update to snake_case
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insert role permissions into the database
    await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role_permissions", null, {});
  },
};
