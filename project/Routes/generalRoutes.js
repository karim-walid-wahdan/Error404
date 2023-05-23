const express = require("express");
const router = express.Router();

const {
    forgetPassword,
    login,
    signUp
} = require("../Controller/generalController");

router.route("/signUp").post(signUp);
router.route("/forgetPassword").post(forgetPassword);
router.route("/").post(login);
module.exports = router;
