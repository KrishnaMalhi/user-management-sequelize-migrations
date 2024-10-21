const UserAuthentication = require("./authentication.routes");
const usersRoutes = require("./users.routes");
const permissionsRoutes = require("./permissions.routes");
const rolesRoutes = require("./roles.routes");
const rolePermissionsRoutes = require("./role-permissions.routes");

const appRouter = (app) => {
  app.use("/api/auth", UserAuthentication);
  app.use("/api/users", usersRoutes);
  app.use("/api/permissions", permissionsRoutes);
  app.use("/api/roles", rolesRoutes);
  app.use("/api/", rolePermissionsRoutes);
  app.get("/check-cookies", (req, res) => {
    // Access cookies via req.cookies
    console.log("Cookies: ", req.cookies); // Shows all cookies
    res.send(req.cookies); // Send cookies to the response
  });
};

module.exports = appRouter;
