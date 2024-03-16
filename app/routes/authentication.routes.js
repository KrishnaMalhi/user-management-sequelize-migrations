const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");
const ValidationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/authentication",
  ValidationMiddleware.validateLogin,
  AuthenticationController.userAuthentication
);

module.exports = router;
