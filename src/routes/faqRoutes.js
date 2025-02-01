const express = require('express');
const router = express.Router();
const { getAllFAQs } = require("../controllers/faqController");

router.get("/", getAllFAQs);
router.post("/", createFAQ);

module.exports = router;