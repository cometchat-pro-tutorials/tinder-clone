const authRoutes = require("./auth");
const userRoutes = require("./users");
const matchRequestsRoutes = require("./requests");

module.exports = function ({ app, dbConn, upload, constants }) {
  authRoutes({ app, dbConn });
  userRoutes({ app, dbConn, upload, constants });
  matchRequestsRoutes({ app, dbConn, constants });
};
