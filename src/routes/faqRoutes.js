const express = require('express');
const router = express.Router();
const { getAllFAQs, createFAQ, updateFAQ,deleteFAQ} = require("../controllers/faqController");

router.get("/", getAllFAQs);
router.post("/", createFAQ);
router.put("/:id", updateFAQ);
router.delete("/:id", deleteFAQ);

module.exports = router;