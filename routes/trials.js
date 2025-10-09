const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const trialController = require("../controllers/trials");

router.get("/form", isLoggedIn, trialController.renderForm);

router.post("/submit-trial", isLoggedIn, trialController.createTrial);

module.exports = router;