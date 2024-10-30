"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class RolePermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RolePermissions.belongsTo(models.Roles, {
        foreignKey: "role_id",
        as: "role",
      });
      RolePermissions.belongsTo(models.Permissions, {
        foreignKey: "permission_id",
        as: "permission",
      });
    }
  }
  RolePermissions.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      // value: { //value should be unique
      //   type: DataTypes.STRING(191),
      // },
      // label: {//label should be unique
      //   type: DataTypes.STRING(191),
      // },
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
      code: {
        ////should be removed
        type: DataTypes.STRING(191),
      },
      description: {
        type: DataTypes.TEXT,
      },
      // status: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: true,
      // },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        //should be removed
        type: DataTypes.DATE,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      permission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "permissions", // should be tablename
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
    },
    {
      sequelize,
      modelName: "RolePermissions",
      tableName: "role_permissions",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      underscored: true,
    }
  );
  return RolePermissions;
};
