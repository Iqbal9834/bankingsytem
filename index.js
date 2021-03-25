const express = require("express");
const mysql = require("mysql");
const { Model } = require("objection");
const knex = require("knex");
const helmet = require("helmet");
const { db_name, host, user, password, port } = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const app = express();

// Database connectivity
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    const con = knex({
      client: "mysql",
      connection: {
        host: host,
        user: user,
        password: password,
        database: db_name,
      },
    });
    Model.knex(con);
  }
}
module.exports = new Database();
// ROUTES
app.use("/v1", userRoutes);

// MIDDLEWARE
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`App is listening at port ${port}!`);
});
