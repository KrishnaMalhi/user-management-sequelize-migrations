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
      name: {
        type: DataTypes.STRING(191),
      },
      label: {
        type: DataTypes.STRING(191),
      },
      menu_label: {
        type: DataTypes.STRING(191),
      },
      page_url: {
        type: DataTypes.STRING(191),
      },
      parent_id: {
        type: DataTypes.UUID,
        allowNull: true, // Allow null for root permissions
        references: {
          model: "permissions", // Corrected model name
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      type: {
        type: DataTypes.STRING(191),
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      // created_by: {
      //   type: DataTypes.UUID,
      // },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
      last_modification_at: {
        type: DataTypes.DATE,
      },
      // last_modified_by: {
      //   type: DataTypes.UUID,
      // },
      last_status_change_at: {
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
