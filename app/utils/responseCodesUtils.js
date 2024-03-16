const ErrorCodes = {
  //USERS
  USER_ALREADY_EXISTS: 500,
  USER_NOT_FOUND: 404,
  INVALID_USER: 400,

  //ROLES
  ROLE_NOT_FOUND: 404,

  //PERMISSIONS
  PERMISSION_NOT_FOUND: 404,
};

const SuccessCodes = {
  USER_REGISTERED_SUCCESSFULLY: 200,
};

module.exports = {
  ErrorCodes,
  SuccessCodes,
};
