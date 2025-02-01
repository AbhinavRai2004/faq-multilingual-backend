const express = require('express');
const router = express.Router();
const { getAllFAQs } = require("../controllers/faqController");

router.get("/", getAllFAQs);

module.exports = router;