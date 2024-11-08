const db = require("../config/models");
const logger = require("../utils/loggerUtils");

const createRole = async (value, label, description) => {
  logger.info("IN - createRole Database query!");
  try {
    const response = await db.Roles.create({
      value,
      label,
      description,
      created_at: new Date(),
    });

    logger.info("OUT - createRole Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createRole Database query: ", err.message);
    throw new Error("ERROR - createRole Database query: ", err.message);
  }
};

const getAllRoles = async () => {
  logger.info("IN - getAllRoles Database query!");
  try {
    const response = await db.Roles.findAll();

    logger.info("OUT - getAllRoles Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - getAllRoles Database query: ", err.message);
    throw new Error("ERROR - getAllRoles Database query: ", err.message);
  }
};

const getRoleById = async (id) => {
  logger.info("IN - getRoleById Database query!");
  try {
    const response = await db.Roles.findOne({
      where: { id },
    });

    logger.info("OUT - getRoleById Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - getRoleById Database query: ", err.message);
    throw new Error("ERROR - getRoleById Database query: ", err.message);
  }
};

const getRoleByValueAndLabel = async (value, label) => {
  logger.info("IN - getRoleByValueAndLabel Database query!");
  try {
    const response = await db.Roles.findOne({
      where: { value, label },
    });

    logger.info("OUT - getRoleByValueAndLabel Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error(
      "ERROR - getRoleByValueAndLabel Database query: ",
      err.message
    );
    throw new Error(
      "ERROR - getRoleByValueAndLabel Database query: ",
      err.message
    );
  }
};

const updateRole = async (id, value, label, description) => {
  logger.info("IN - updateRole Database query!");
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

    logger.info("OUT - updateRole Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - updateRole Database query: ", err.message);
    throw new Error("ERROR - updateRole Database query: ", err.message);
  }
};

const deleteRole = async (id) => {
  logger.info("IN - deleteRole Database query!");
  try {
    const response = await db.Roles.destroy({
      where: { id },
    });

    logger.info("OUT - deleteRole Database query!");
    return response;
  } catch (err) {
    console.log(err);
    logger.error("ERROR - deleteRole Database query: ", err.message);
    throw new Error("ERROR - deleteRole Database query: ", err.message);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  getRoleByValueAndLabel,
  updateRole,
  deleteRole,
};
