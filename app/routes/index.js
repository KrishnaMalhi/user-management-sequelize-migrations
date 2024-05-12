const UserAuthentication = require("./authentication.routes");
const usersRoutes = require("./users.routes");
const permissionsRoutes = require("./permissions.routes");
const rolesRoutes = require("./roles.routes");
const rolePermissionsRoutes = require("./role-permissions.routes");

const appRouter = (app) => {
  app.use("/user", UserAuthentication);
  app.use("/users", usersRoutes);
  app.use("/permissions", permissionsRoutes);
  app.use("/roles", rolesRoutes);
  app.use("/", rolePermissionsRoutes);
};

module.exports = appRouter;
