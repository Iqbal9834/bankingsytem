const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const User = require("../model/user")
const { ValidationError, UniqueViolationError } = require("objection");
const { user } = require("../../config");
const { secret, expires } = require("../../config");
const userControllers = {
  signup: async (req, res) => {
    try {
      // Creating a new user
      req.body["password"]=passwordHash.generate(req.body["password"]);
      const user = await User.query().insert(req.body);
      return res.status(200).json({"message":"user created successfully"})
    } catch (error) {
      if (error instanceof ValidationError){
        return res.status(400).json({"message": error.message})
      }
      if (error instanceof UniqueViolationError){
        return res.status(400).json({"message": error.nativeError.sqlMessage})
      }
      return console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.query().select('email', 'role', 'id', 'password').where("email", req.body.email)
      if (user === null) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      if (req.body.password == null) {
        res
          .status(400)
          .json({ success: false, data: { message: "Password is required" } });
      }
      if (passwordHash.verify(req.body.password, user[0].password)) {
        payload = {
          user_id: user[0].id,
          email: user[0].email,
          role: user[0].role,
        };
        accessToken = jwt.sign(payload, secret, { expiresIn: expires });
        return res.status(200).json({
          success: true,
          accessToken: accessToken,
          expiresIn: expires,
        });
      }
      res
        .status(400)
        .json({ success: false, data: { msg: "Incorrect password" } });
    } catch (e) {
      res.status(500).json({
        success: false,
        data: { message: "An error occurred while processing request" },
      });
    }
  },
};
module.exports = userControllers;
