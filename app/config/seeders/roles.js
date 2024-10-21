"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed Roles
    await queryInterface.bulkInsert("roles", [
      {
        id: uuidv4(),
        name: "Admin",
        label: "Administrator",
        description: "Full access to all resources",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "User",
        label: "Standard User",
        description: "Limited access",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
