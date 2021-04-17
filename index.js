const bodyParser = require('body-parser')
const express = require("express");
const mysql = require("mysql");
const { Model } = require("objection");
const knex = require("knex");
const helmet = require("helmet");
const { db_name, host, user, password, port } = require("./config");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const branchRoutes = require("./src/routes/branchRoutes")
const customerRoutes = require("./src/routes/customerRoutes")
const accountRoutes = require("./src/routes/accountRoutes")
const transactionRoutes = require("./src/routes/transactionRoutes");
const transactionControllers = require('./src/controllers/transactionController');
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
// middleware
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// ROUTES
app.use("/v1", userRoutes, branchRoutes, customerRoutes, accountRoutes, transactionRoutes);

app.listen(port, () => {
  console.log(`App is listening at port ${port}!`);
});
