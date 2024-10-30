const db = require("../config/models");
const logger = require("../utils/loggerUtils");

const createRolePermissions = async (name, label, description) => {
  logger.info("IN - createRolePermissions Database query!");
  try {
    const response = await db.Roles.create({
      name,
      label,
      description,
      created_at: new Date(),
    });

    logger.info("OUT - createRolePermissions Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createRolePermissions Database query: ", err.message);
    throw new Error(
      "ERROR - createRolePermissions Database query: ",
      err.message
    );
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
        // exclude: ["password", "remember_token", "wrong_password_attempts"],
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

const updateRolePermissions = async (id, name, label, description) => {
  logger.info("IN - updateRolePermissions Database query!");
  try {
    const response = await db.Roles.update(
      {
        name,
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

const assignPermissionsToRole = async (
  role,
  permission,
  isCreate,
  isRead,
  isUpdate,
  isDelete,
  code,
  description
) => {
  logger.info("IN - assignPermissionsToRole Database query!");
  try {
    const response = await db.RolePermissions.create({
      role,
      permission,
      create: isCreate,
      read: isRead,
      update: isUpdate,
      delete: isDelete,
      code,
      description,
      //   created_at: new Date(),
    });

    logger.info("OUT - assignPermissionsToRole Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error(
      "ERROR - assignPermissionsToRole Database query: ",
      err.message
    );
    throw new Error(
      "ERROR - assignPermissionsToRole Database query: ",
      err.message
    );
  }
};

module.exports = {
  createRolePermissions,
  getAllRolesPermissions,
  getRolePermissionsById,
  updateRolePermissions,
  deleteRolePermissions,
  assignPermissionsToRole,
};
