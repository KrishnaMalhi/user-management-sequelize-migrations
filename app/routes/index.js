const UserAuthentication = require("./authentication.routes");

const prefix = "api";
const appRouter = (app) => {
  app.use(prefix + "/user", UserAuthentication);
};

module.exports = appRouter;
