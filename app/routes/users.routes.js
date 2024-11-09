const express = require("express");
const router = express.Router();
const UsersContoller = require("../controllers/users.controller");
const ValidationMiddleware = require("../middlewares/validationMiddleware");
const AuthenticationMiddleware = require("../middlewares/authentication");

router.post(
  "/create-user",
  AuthenticationMiddleware.verifyToken,
  ValidationMiddleware.validateCreateUser,
  UsersContoller.createUser
);
router.get(
  "/get-all-users",
  AuthenticationMiddleware.verifyToken,
  UsersContoller.getAllUsers
);
router.get(
  "/get-user-by-email",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateGetUserByEmail,
  UsersContoller.getUserByEmail
);
router.get(
  "/get-user-by-id",
  AuthenticationMiddleware.verifyToken,
  //   ValidationMiddleware.validateGetUserById,
  UsersContoller.getUserById
);

router.delete(
  "/delete-user",
  AuthenticationMiddleware.verifyToken,
  UsersContoller.deleteUser
);

module.exports = router;
