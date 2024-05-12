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
      isCreate: {
        type: DataTypes.TINYINT(1),
      },
      isRead: {
        type: DataTypes.TINYINT(1),
      },
      isUpdate: {
        type: DataTypes.TINYINT(1),
      },
      isDelete: {
        type: DataTypes.TINYINT(1),
      },
      code: {
        type: DataTypes.STRING(191),
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
      deleted_at: {
        type: DataTypes.DATE,
      },
      role: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      permission: {
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
