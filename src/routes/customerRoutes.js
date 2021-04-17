const express = require("express");
const customerControllers = require("../controllers/customerController")
const isAuthenticated = require("../middleware/tokenVerify");
const router = express.Router();
router.use(isAuthenticated);

router.get("/customer/", customerControllers.readAllData);
router.get("/customer/:customer_id/", customerControllers.readById)
router.post("/customer/", customerControllers.create);
router.put("/customer/:customer_id/", customerControllers.update);
router.delete("/customer/:customer_id/", customerControllers.delete);

module.exports = router;
