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
      Users.belongsTo(models.Roles, { foreignKey: "role_id", as: "role" });
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
        type: DataTypes.STRING(50),
      },
      username: {
        type: DataTypes.STRING(50),
        // unique: true,
      },
      desgination: {
        type: DataTypes.STRING(50),
        // unique: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      country: {
        type: DataTypes.STRING(50),
      },
      city: {
        type: DataTypes.STRING(50),
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      password: {
        type: DataTypes.STRING(50),
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: true,
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
