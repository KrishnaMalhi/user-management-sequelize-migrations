const RolesDBQuery = require("../queries/roles.query");
const { ErrorCodes } = require("../utils/responseCodesUtils");
const { ErrorMessage } = require("../utils/responseMessagesUtils");
const ResponseUtils = require("../utils/responseUtils");
const logger = require("../utils/loggerUtils");

const createRole = async (req, res) => {
  logger.info("IN - createRole controller!");
  try {
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

    const { name, label, description } = req.body;
    const response = await RolesDBQuery.createRole(name, label, description);
    logger.info("OUT - createRole controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("ERROR - createRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllRoles = async (req, res) => {
  logger.info("IN - getAllRoles controller!");
  try {
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

    const response = await RolesDBQuery.getAllRoles();
    logger.info("OUT - getAllRoles controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("Error - getAllRoles controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getRoleById = async (req, res) => {
  logger.info("IN - getRoleById controller!");
  try {
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

    const { id } = req.body;
    const response = await RolesDBQuery.getRoleById(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    logger.info("OUT - getRoleById controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - getRoleById controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const updateRole = async (req, res) => {
  logger.info("IN - updateRole controller!");
  try {
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

    const { id, name, label, description } = req.body;
    const isExist = await RolesDBQuery.getRoleById(id);
    if (!isExist) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }
    const response = await RolesDBQuery.updateRole(
      id,
      name,
      label,
      description
    );
    logger.info("OUT - updateRole controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log(err);
    logger.error("ERROR - updateRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const deleteRole = async (req, res) => {
  logger.info("IN - deleteRole controller!");
  try {
    // const token = req.cookies.authToken; // Get token from cookies

    // if (!token) {
    //   return ResponseUtils.sendError(
    //     res,
    //     req,
    //     {},
    //     ErrorMessage.UNAUTHORIZED,
    //     ErrorCodes.UNAUTHORIZED
    //   );
    // }

    const { id } = req.body;
    const response = await RolesDBQuery.deleteRole(id);
    if (!response) {
      return ResponseUtils.sendError(
        res,
        req,
        {},
        ErrorMessage.ROLE_NOT_FOUND,
        ErrorCodes.ROLE_NOT_FOUND
      );
    }

    logger.info("OUT - deleteRole controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    console.log("err: ", err);
    logger.error("ERROR - deleteRole controller: ", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};

// controllers/roleController.js
// const { Role, Permission } = require('../models');

// exports.createRole = async (req, res) => {
//   try {
//     const { name, description, permissions } = req.body;

//     const role = await Role.create({ name, description });

//     if (permissions && permissions.length > 0) {
//       const permissionObjects = await Permission.findAll({
//         where: { id: permissions },
//       });
//       await role.addPermissions(permissionObjects);
//     }

//     res.status(201).json(role);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating role' });
//   }
// };
