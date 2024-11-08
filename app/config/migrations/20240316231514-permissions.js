"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("permissions", {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      label: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      page_url: {
        type: DataTypes.STRING(191),
      },
      type: {
        type: DataTypes.ENUM("parent", "child"),
        allowNull: false,
        defaultValue: "parent",
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    });
    await queryInterface.addConstraint("permissions", {
      type: "foreign key",
      fields: ["parent_id"],
      name: "fk_permissions_parent_id", // Adjusted constraint name
      references: {
        table: "permissions",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("permissions");
  },
};
