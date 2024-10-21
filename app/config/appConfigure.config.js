const express = require("express");
const helmet = require("helmet");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");

const configureExpressApp = (app) => {
  app.use(
    cors({
      origin: ["http://localhost:5000"],
      credentials: true,
    })
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // app.use(express.bodyParser({ limit: "50mb" }));
  app.use(helmet());
  // app.use(auditDateSetter.setReqDate);

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "User Management Api Library",
        version: "1.0.0",
        description: "User Management",
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
      ],
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    apis: ["./app/routes/*.js"],
  };

  const specs = swaggerJsDoc(options);

  // app.use(setHeaders);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
};

module.exports = configureExpressApp;
