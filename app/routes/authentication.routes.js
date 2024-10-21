const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");
const ValidationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/login",
  ValidationMiddleware.validateLogin,
  AuthenticationController.login
);

router.post(
  "/logout",
  // ValidationMiddleware.validateLogin,
  AuthenticationController.logout
);

router.post(
  "/register",
  ValidationMiddleware.validateRegister,
  AuthenticationController.register
);

router.post(
  "/create-password",
  ValidationMiddleware.validateCreatePassword,
  AuthenticationController.createPassword
);

module.exports = router;
