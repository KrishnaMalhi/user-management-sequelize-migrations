"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
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
      username: {
        type: DataTypes.STRING(191),
      },
      mobile_number: {
        type: DataTypes.STRING(20),
      },
      email: {
        type: DataTypes.STRING(191),
        unique: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      password: {
        type: DataTypes.STRING(191),
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
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      underscored: true,
    }
  );
  return Users;
};
