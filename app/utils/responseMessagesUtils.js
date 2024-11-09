const ErrorMessage = {
  //Token
  UNAUTHORIZED: "Unauthorized!",

  //Authentication

  //USERS
  USER_ALREADY_EXISTS: "User already exists!",
  USER_NOT_FOUND: "User not found!",
  INVALID_USER: "Invalid user!",
  PHONE_ALREADY_EXISTS: "Phone number is already in use!",

  //ROLES
  ROLE_NOT_FOUND: "Role not found!",
  ROLE_ALREADY_EXISTS: "Role already exists!",

  //PERMISSIONS
  PERMISSION_NOT_FOUND: "Permission not found!",
  PERMISSION_ALREADY_EXISTS: "Permission already exists!",

  // ROLE PERMISSIONS
  ROLE_PERMISSIONS_NOT_FOUND: "Role permissions not found!",
  PERMISSIONS_AGAINST_ROLE_ALREADY_EXISTS:
    "Permissions against role already exists!",
};

const SuccessMessages = {
  //Authentication
  USER_LOGIN_SUCCESSFULLY: "User login successfully!",
  USER_REGISTERED_SUCCESSFULLY: "User registered successfully!",
  PASSWORD_CREATED_SUCCESSFULLY: "Password created successfully!",

  //Users
  USER_CREATED_SUCCESSFULLY: "User created successfully!",
  USER_UPDATED_SUCCESSFULLY: "User updated successfully!",
  USER_DELETED_SUCCESSFULLY: "User deleted successfully!",

  //Roles
  ROLE_CREATED_SUCCESSFULLY: "Role created successfully!",
  ROLE_UPDATED_SUCCESSFULLY: "Role updated successfully!",
  ROLE_DELETED_SUCCESSFULLY: "Role deleted successfully!",

  //Permissions
  PERMISSION_CREATED_SUCCESSFULLY: "Permission created successfully!",
  PERMISSION_UPDATED_SUCCESSFULLY: "Permission updated successfully!",
  PERMISSION_DELETED_SUCCESSFULLY: "Permission deleted successfully!",

  //Role Permissions
  PERMISSIONS_ASSIGNED_TO_ROLE_SUCCESSFULLY:
    "Permissions assigned to role successfully!",
  ROLE_PERMISSIONS_UPDATED_SUCCESSFULLY:
    "Role permissions updated successfully!",
  ROLE_PERMISSIONS_DELETED_SUCCESSFULLY:
    "Role permissions deleted successfully!",
};
module.exports = {
  ErrorMessage,
  SuccessMessages,
};
