const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController");

router.route("/addAdmin").post(adminController.addAdmin);
router.route("/addCorporateTrainee").post(adminController.addCorporateTrainee);
router.route("/addInstructor").post(adminController.addInstructor);

module.exports = router;
