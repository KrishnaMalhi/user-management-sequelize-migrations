"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create a unique ID for "User Management"
    const userManagementId = uuidv4();

    // Define the permissions
    const permissions = [
      {
        id: userManagementId,
        name: "User Management",
        label: "User Management",
        menu_label: "User Management",
        page_url: "/users",
        parent_id: null,
        type: "group",
        description: "Manage users in the system",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "All Users",
        label: "All Users",
        menu_label: "All Users",
        page_url: "/users",
        parent_id: userManagementId, // Reference the generated ID
        type: "action",
        description: "View all users",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Roles Permissions",
        label: "Roles Permissions",
        menu_label: "Roles Permissions",
        page_url: "/users/role-permissions",
        parent_id: userManagementId, // Reference the generated ID
        type: "action",
        description: "Manage roles and their permissions",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Settings",
        label: "Settings",
        menu_label: "Settings",
        page_url: "/settings",
        parent_id: null,
        type: "group",
        description: "Manage system settings",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insert permissions into the database
    await queryInterface.bulkInsert("permissions", permissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the permissions in reverse order
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
