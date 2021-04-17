const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  db_name: process.env.DBNAME,
  secret: process.env.SECRET,
  expires: process.env.EXPIRE,
  password: process.env.PASSWORD,
  port: process.env.PORT

};
