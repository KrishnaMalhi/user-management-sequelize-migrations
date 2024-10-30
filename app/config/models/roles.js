"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Roles.belongsToMany(models.Permissions, {
      //   foreignKey: "role",
      //   through: models.RolePermissions,
      // });
      // Roles.hasMany(models.Users, { foreignKey: "role" });
      Roles.hasMany(models.Users, { foreignKey: "role_id", as: "users" });
      Roles.belongsToMany(models.Permissions, {
        // through: "RolePermissions",
        through: models.RolePermissions,
        foreignKey: "role_id",
      });
    }
  }
  Roles.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      name: {// name should be changed to value and value should be unique
        type: DataTypes.STRING(191),
      },
      label: { //label should be unique
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
      deleted_at: {//should be removed
        type: DataTypes.DATE,
      },
      last_modification_at: {//should be removed
        type: DataTypes.DATE,
      },
      // last_modified_by: {
      //   type: DataTypes.UUID,
      // },
      last_status_change_at: {//should be removed
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Roles",
      tableName: "roles",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      underscored: true,
    }
  );
  return Roles;
};
