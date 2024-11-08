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
      is_create: {
        type: DataTypes.TINYINT(1),
      },
      is_read: {
        type: DataTypes.TINYINT(1),
      },
      is_update: {
        type: DataTypes.TINYINT(1),
      },
      is_delete: {
        type: DataTypes.TINYINT(1),
      },
      description: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });

    // add the all the constraints here for this table
    await queryInterface.addConstraint("role_permissions", {
      type: "foreign key",
      fields: ["role_id"],
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
      fields: ["permission_id"],
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
