const express = require('express');
const router = express.Router();
const { getAllFAQs, createFAQ, updateFAQ} = require("../controllers/faqController");

router.get("/", getAllFAQs);
router.post("/", createFAQ);
router.put("/:id", updateFAQ);

module.exports = router;