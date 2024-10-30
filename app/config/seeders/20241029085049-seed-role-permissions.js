"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("role_permissions", [
      {
        id: uuidv4(),
        role_id: "657096c4-fc30-442a-8a63-173d182328a9", // Hr role
        permission_id: "3228bf3e-5c9b-44ff-8bb9-4f276ea064f3", // Users permission
        is_create: 1,
        is_read: 1,
        is_update: 1,
        is_delete: 1,
        description: "Hr has full access to Users",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        role_id: "7a03c888-36f1-4b44-b645-87bec33c6e80", // Super User role
        permission_id: "b438b9d1-7b3b-47ad-a68a-888aeb06c74a", // User Management permission
        is_create: 1,
        is_read: 1,
        is_update: 1,
        is_delete: 1,
        description: "Super User has full access to User Management",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        role_id: "9146aa9d-6311-45e1-98f2-abac28c45da6", // Manager role
        permission_id: "48318946-ac06-46fb-af40-43f93368a5c0", // Roles permission
        is_create: 1,
        is_read: 1,
        is_update: 1,
        is_delete: 0,
        description: "Manager can manage roles but cannot delete",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        role_id: "aae5fa8e-1e02-4781-9be2-8bfa74c7bc4c", // Admin role
        permission_id: "fc3ecb20-e4e9-49bd-b084-e33535b44951", // Permissions page
        is_create: 1,
        is_read: 1,
        is_update: 1,
        is_delete: 1,
        description: "Admin has full access to Permissions",
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("role_permissions", null, {});
  },
};
