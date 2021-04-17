const express = require("express");
const branchControllers = require("../controllers/branchController")
const isAuthenticated = require("../middleware/tokenVerify");
const router = express.Router();
router.use(isAuthenticated);

router.get("/branch/", branchControllers.readAllData);
router.get("/branch/:branch_id/", branchControllers.readById)
router.post("/branch/", branchControllers.create);
router.put("/branch/:branch_id/", branchControllers.update);
router.delete("/branch/:branch_id/", branchControllers.delete);

module.exports = router;
