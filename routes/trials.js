const express = require("express");
const router = express.Router();
const trialController = require("../controllers/trials");

router.get("/form", (req, res) => {
  res.render("form");
});

router.post("/submit-trial", trialController.submitTrial);

module.exports = router;