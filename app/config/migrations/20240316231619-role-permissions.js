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
    await queryInterface.createTable("role_permissions", {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      create: {
        type: DataTypes.TINYINT(1),
      },
      read: {
        type: DataTypes.TINYINT(1),
      },
      update: {
        type: DataTypes.TINYINT(1),
      },
      delete: {
        type: DataTypes.TINYINT(1),
      },
      code: {
        type: DataTypes.STRING(191),
      },
      description: {
        type: DataTypes.TEXT,
      },
      role: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      permission: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });

    // add the all the constraints here for this table
    await queryInterface.addConstraint("role_permissions", {
      type: "foreign key",
      fields: ["role"],
      name: "fk_role_permissions__role",
      references: {
        table: "roles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
    await queryInterface.addConstraint("role_permissions", {
      type: "foreign key",
      fields: ["permission"],
      name: "fk_role_permissions__permission",
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
    await queryInterface.dropTable("role_permissions");
  },
};
