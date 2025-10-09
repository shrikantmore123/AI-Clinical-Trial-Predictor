const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const { submitTrial } = require("../controllers/trials");

router.post("/", isLoggedIn, submitTrial);

module.exports = router;