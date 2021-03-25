const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const User = require("../model/user")
// const { secret, expires, email } = require("../../config");
const userControllers = {
  signup: async (req, res) => {
    try {
      // Creating a new user
      const user = await User.query().insert(req.body);
    } catch (error) {
      return console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).lean();
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
      if (passwordHash.verify(req.body.password, user.password)) {
        payload = {
          user_id: user._id,
          email: user.email,
          role: user.role,
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
