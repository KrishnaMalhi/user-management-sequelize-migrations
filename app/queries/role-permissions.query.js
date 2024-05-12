const db = require("../config/models");
const logger = require("../utils/loggerUtils");

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
  assignPermissionsToRole,
};
