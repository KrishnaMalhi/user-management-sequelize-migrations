const { where } = require("sequelize");
const db = require("../config/models");
const logger = require("../utils/loggerUtils");

const createRolePermissions = async ({
  role_id,
  permission_id,
  is_create,
  is_read,
  is_update,
  is_delete,
  description,
}) => {
  logger.info("IN - createRolePermission Database query!");
  try {
    const response = await db.RolePermissions.create({
      role_id,
      permission_id,
      is_create,
      is_read,
      is_update,
      is_delete,
      description,
      created_at: new Date(),
    });

    logger.info("OUT - createRolePermission Database query!");
    return response;
  } catch (err) {
    logger.error("ERROR - createRolePermission Database query: ", err.message);
    throw new Error("Failed to create role permission");
  }
};

const getAllRolesPermissions = async () => {
  logger.info("IN - getAllRolesPermissions Database query!");
  try {
    const response = await db.RolePermissions.findAll({
      include: [
        { model: db.Roles, as: "role" },
        { model: db.Permissions, as: "permission" },
      ],
      attributes: {
        exclude: ["role_id", "permission_id"],
      },
    });

    logger.info("OUT - getAllRolesPermissions Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error(
      "ERROR - getAllRolesPermissions Database query: ",
      err.message
    );
    throw new Error(
      "ERROR - getAllRolesPermissions Database query: ",
      err.message
    );
  }
};

const getAllPermissionsAgainstRole = async (id) => {
  logger.info("IN - getAllPermissionsAgainstRole Database query!");
  try {
    const response = await db.RolePermissions.findAll({
      raw: true,
      where: { role_id: id },
      include: [{ model: db.Permissions, as: "permission" }],
      attributes: [
        "id",
        "description",
        "created_at",
        "updated_at",
        "is_create",
        "is_delete",
        "is_read",
        "is_update",
      ],
    });

    logger.info("OUT - getAllPermissionsAgainstRole Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error(
      "ERROR - getAllPermissionsAgainstRole Database query: ",
      err.message
    );
    throw new Error(
      "ERROR - getAllPermissionsAgainstRole Database query: ",
      err.message
    );
  }
};

const getAllRolesPermissionsGroupByRole = async () => {
  logger.info("IN - getAllRolesPermissionsGroupByRole Database query!");
  try {
    const response = await db.RolePermissions.findAll({
      raw: true, // Return plain JSON objects
      include: [
        { model: db.Roles, as: "role" },
        {
          model: db.Permissions,
          as: "permission",
        },
      ],
      attributes: [
        "id",
        "description",
        "created_at",
        "updated_at",
        "is_create",
        "is_read",
        "is_delete",
        "is_update",
      ],
    });

    logger.info("OUT - getAllRolesPermissionsGroupByRole Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error(
      "ERROR - getAllRolesPermissionsGroupByRole Database query: ",
      err.message
    );
    throw new Error(
      "ERROR - getAllRolesPermissionsGroupByRole Database query: ",
      err.message
    );
  }
};

const getRolePermissionsById = async (id) => {
  logger.info("IN - getRolePermissionsById Database query!");
  try {
    const response = await db.Roles.findOne({
      where: { id },
    });

    logger.info("OUT - getRolePermissionsById Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error(
      "ERROR - getRolePermissionsById Database query: ",
      err.message
    );
    throw new Error(
      "ERROR - getRolePermissionsById Database query: ",
      err.message
    );
  }
};

const updateRolePermissions = async (id, value, label, description) => {
  logger.info("IN - updateRolePermissions Database query!");
  try {
    const response = await db.Roles.update(
      {
        value,
        label,
        description,
        updated_at: new Date(),
      },
      {
        where: { id },
      }
    );

    logger.info("OUT - updateRolePermissions Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - updateRolePermissions Database query: ", err.message);
    throw new Error(
      "ERROR - updateRolePermissions Database query: ",
      err.message
    );
  }
};

const deleteRolePermissions = async (id) => {
  logger.info("IN - deleteRolePermissions Database query!");
  try {
    const response = await db.Roles.destroy({
      where: { id },
    });

    logger.info("OUT - deleteRolePermissions Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - deleteRolePermissions Database query: ", err.message);
    throw new Error(
      "ERROR - deleteRolePermissions Database query: ",
      err.message
    );
  }
};

module.exports = {
  createRolePermissions,
  getAllRolesPermissions,
  getAllPermissionsAgainstRole,
  getAllRolesPermissionsGroupByRole,
  getRolePermissionsById,
  updateRolePermissions,
  deleteRolePermissions,
};
