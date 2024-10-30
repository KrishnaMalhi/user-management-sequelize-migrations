"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("permissions", [
      {
        id: "3228bf3e-5c9b-44ff-8bb9-4f276ea064f3",
        name: "users",
        label: "Users",
        menu_label: "Users",
        page_url: "/users",
        parent_id: "b438b9d1-7b3b-47ad-a68a-888aeb06c74a",
        type: "Child",
        description:
          "This is the users page, containing user listing, creation, editing, viewing, and deletion functionality.",
        status: 1,
        created_at: new Date("2024-10-28T20:57:24"),
        updated_at: new Date("2024-10-28T21:29:15"),
      },
      {
        id: "48318946-ac06-46fb-af40-43f93368a5c0",
        name: "roles",
        label: "Roles",
        menu_label: "Roles",
        page_url: "/users/roles",
        parent_id: "b438b9d1-7b3b-47ad-a68a-888aeb06c74a",
        type: "Child",
        description:
          "This is the roles page, containing roles listing, creation, editing, viewing, and deletion functionality.",
        status: 1,
        created_at: new Date("2024-10-28T20:58:29"),
        updated_at: new Date("2024-10-28T21:29:05"),
      },
      {
        id: "92b851ab-e45f-49d8-9d59-f71f6ec7c0b6",
        name: "role_permissions",
        label: "Role Permissions",
        menu_label: "Role Permissions",
        page_url: "/users/role-permissions",
        parent_id: "b438b9d1-7b3b-47ad-a68a-888aeb06c74a",
        type: "Child",
        description:
          "This is the role permissions page, containing a list of permissions assigned to roles, creation, editing, and deletion functionality.",
        status: 1,
        created_at: new Date("2024-10-28T21:02:43"),
        updated_at: new Date("2024-10-28T21:28:53"),
      },
      {
        id: "b438b9d1-7b3b-47ad-a68a-888aeb06c74a",
        name: "user_management",
        label: "User Management",
        menu_label: "User Management",
        page_url: "/user-management",
        parent_id: null,
        type: "Parent",
        description:
          "This is the user management module, containing users, roles, permissions, and role permissions.",
        status: 1,
        created_at: new Date("2024-10-28T20:54:19"),
        updated_at: new Date("2024-10-28T21:00:29"),
      },
      {
        id: "fc3ecb20-e4e9-49bd-b084-e33535b44951",
        name: "permissions",
        label: "Permissions",
        menu_label: "Permissions",
        page_url: "/users/permissions",
        parent_id: "b438b9d1-7b3b-47ad-a68a-888aeb06c74a",
        type: "Child",
        description:
          "This is the permissions page, containing permission listing, creation, editing, viewing, and deletion functionality.",
        status: 1,
        created_at: new Date("2024-10-28T20:59:48"),
        updated_at: new Date("2024-10-28T21:28:29"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
