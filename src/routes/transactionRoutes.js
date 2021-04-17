const express = require("express");
const transactionControllers = require("../controllers/transactionController")
const isAuthenticated = require("../middleware/tokenVerify");
const router = express.Router();
router.use(isAuthenticated);

router.get("/transaction/:transaction_id/", transactionControllers.readById)
router.post("/transaction/", transactionControllers.create);
router.put("/transaction/transaction_id/", transactionControllers.update);
router.delete("/transaction/:transaction_id/", transactionControllers.delete);

module.exports = router;
