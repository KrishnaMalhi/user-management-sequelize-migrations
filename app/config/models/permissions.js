"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Permissions.belongsToMany(models.Roles, {
      //   foreignKey: "permission",
      //   through: models.RolePermissions,
      // });
      Permissions.belongsToMany(models.Roles, {
        // through: 'RolePermissions',
        through: models.RolePermissions,
        foreignKey: "permission_id",
      });
    }

    // Static method to fetch inherited permissions recursively
    // static async getInheritedPermissions(permissionId) {
    //   const permission = await Permissions.findByPk(permissionId);
    //   if (!permission) return [];

    //   // Base case: if permission has no parent, return its own ID
    //   if (!permission.parent_id) {
    //     return [permission.id];
    //   }

    //   // Recursively fetch parent's permissions
    //   const parentPermissions = await Permissions.getInheritedPermissions(
    //     permission.parent_id
    //   );
    //   return [...parentPermissions, permission.id];
    // }
  }
  Permissions.init(
    {
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
      // action: {
      //   type: Sequelize.STRING,  // E.g., 'create', 'read', 'edit', 'delete'
      //   allowNull: false,
      // },
      parent_id: {
        type: DataTypes.UUID,
        allowNull: true, // Allow null for root permissions
        references: {
          model: "Permissions",
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
    },

    {
      sequelize,
      modelName: "Permissions",
      tableName: "permissions",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      underscored: true,
    }
  );
  return Permissions;
};
