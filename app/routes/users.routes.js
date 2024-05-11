const express = require("express");
const router = express.Router();
const UsersContoller = require("../controllers/users.controller");
// const ValidationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/create-user",
//   ValidationMiddleware.validateCreateUser,
  UsersContoller.createUser
);
router.get(
  "/get-all-users",
  UsersContoller.getAllUsers
);
router.get(
  "/get-user-by-email",
//   ValidationMiddleware.validateGetUserByEmail,
  UsersContoller.getUserByEmail
);
router.get(
  "/get-user-by-id",
//   ValidationMiddleware.validateGetUserById,
  UsersContoller.getUserById
);

module.exports = router;