"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        id: "657096c4-fc30-442a-8a63-173d182328a9",
        name: "Hr",
        label: "Hr",
        description: "Hr can manage payrolls",
        status: 1,
        created_at: "2024-10-27 20:24:20",
      },
      {
        id: "7a03c888-36f1-4b44-b645-87bec33c6e80",
        name: "super_user",
        label: "Super User",
        description:
          "This is a super user who can manage all users, admins, and the whole application",
        status: 1,
        created_at: "2024-10-29 08:40:29",
      },
      {
        id: "9146aa9d-6311-45e1-98f2-abac28c45da6",
        name: "Manager",
        label: "Manager",
        description:
          "Manager can manage teams, projects, workflows, and clients",
        status: 1,
        created_at: "2024-10-27 20:39:38",
      },
      {
        id: "aae5fa8e-1e02-4781-9be2-8bfa74c7bc4c",
        name: "Admin",
        label: "Administration",
        description: "Admin can manage the whole application",
        status: 1,
        created_at: "2024-10-27 15:26:32",
        updated_at: "2024-10-29 08:39:41",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
