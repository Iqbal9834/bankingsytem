const express = require("express");
const accountControllers = require("../controllers/accountController")
const isAuthenticated = require("../middleware/tokenVerify");
const { route } = require("./userRoutes");
const router = express.Router();
router.use(isAuthenticated);

router.get("/account/", accountControllers.readAllData);
router.get("/account/:account_id/", accountControllers.readById)
router.post("/branch/:branch_id/account/", accountControllers.create);
router.put("/account/:account_id/", accountControllers.update);
router.delete("/account/:account_id/", accountControllers.delete);
router.get("/account/:account_id/transactions", accountControllers.readTransactionById)

module.exports = router;
