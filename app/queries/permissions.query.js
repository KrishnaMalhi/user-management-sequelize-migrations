const db = require("../config/models");
const logger = require("../utils/loggerUtils");

const createPermission = async (
  name,
  label,
  menu_label,
  page_url,
  // parent_id,
  type,
  descirption
) => {
  logger.info("IN - createPermission Database query!");
  try {
    const response = await db.Permissions.create({
      name,
      label,
      menu_label,
      page_url,
      // parent_id,
      type,
      descirption,
      created_at: new Date(),
    });

    logger.info("OUT - createPermission Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createPermission Database query: ", err.message);
    throw new Error("ERROR - createPermission Database query: ", err.message);
  }
};

const getAllPermissions = async () => {
  logger.info("IN -  getAllPermissions Database query!");
  try {
    const response = await db.Permissions.findAll();

    logger.info("OUT -  getAllPermissions Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - getAllPermissions Database query: ", err.message);
    throw new Error("ERROR - getAllPermissions Database query: ", err.message);
  }
};

const getPermissionById = async (id) => {
  logger.info("IN - getPermissionById Database query!");
  try {
    let response = await db.Permissions.findOne({
      where: { id },
    });

    logger.info("OUT - getPermissionById Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - getPermissionById Database query: ", err.message);
    throw new Error("ERROR - getPermissionById Database query: ", err.message);
  }
};

const updatePermission = async (
  id,
  name,
  label,
  menu_label,
  page_url,
  // parent_id,
  type,
  description
) => {
  logger.info("IN - updatePermission Database query!");
  try {
    const response = await db.Permissions.update(
      {
        name,
        label,
        menu_label,
        page_url,
        // parent_id,
        type,
        description,
        updated_at: new Date(),
      },
      {
        where: { id },
      }
    );

    logger.info("OUT - updatePermission Database query!");
    return response;
  } catch (err) {
    console.error(err);
    logger.error("ERROR - updatePermission Database query: ", err.message);
    throw new Error("ERROR - updatePermission Database query: " + err.message);
  }
};

const deletePermission = async (id) => {
  logger.info("IN - deletePermission Database query!");
  try {
    let response = await db.Permissions.destroy({
      where: { id },
    });

    logger.info("OUT - deletePermission Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - deletePermission Database query: ", err.message);
    throw new Error("ERROR - deletePermission Database query: ", err.message);
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
