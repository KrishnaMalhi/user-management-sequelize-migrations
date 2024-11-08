const yup = require("yup");
const logger = require("../utils/loggerUtils");

const ResponseUtils = require("../utils/responseUtils");

const validate = async (schema, req, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ message }) => ({
      validationError: message,
    }));

    logger.error(errors);
    ResponseUtils.sendError(res, req, {}, errors, 400);
  }
};

//=========================Authentication Validation===========================
const validateLogin = async (req, res, next) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  await validate(schema, req, req.body, res, next);
};

const validateRegister = async (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required(),
    // password: yup.string(),
  });
  await validate(schema, req, req.body, res, next);
};

const validateCreatePassword = async (req, res, next) => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must not be greater than 50 character")
      .required(),
    email: yup.string().email().required(),
  });
  await validate(schema, req, req.body, res, next);
};

// ==========================USERS========================
const validateCreateUser = async (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required(),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must not be greater than 50 character")
      .required(),
  });
  await validate(schema, req, req.body, res, next);
};
const ValidationMiddleware = {
  validateLogin,
  validateRegister,
  validateCreatePassword,
  validateCreateUser,
};

module.exports = ValidationMiddleware;
