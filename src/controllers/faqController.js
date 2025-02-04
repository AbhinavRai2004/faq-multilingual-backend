const FAQ = require("../models/faqModel");
const { translateFAQ } = require("../services/translationService");
const { getCache, setCache, delCache } = require("../services/cacheService");

// Get all FAQs
const getAllFAQs = async (req, res) => {
  const { lang = "en" } = req.query;
  const cacheKey = `faqs:${lang}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }
    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => faq.getTranslatedFAQ(lang));

    await setCache(cacheKey, translatedFAQs);
    res.json(translatedFAQs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ceate a new FAQ
const createFAQ = async (req, res) => {
  const { question, answer, languages = ["hi", "bn"] } = req.body;

  try {
    const faq = new FAQ({ question, answer });
    faq.translations = await translateFAQ(question, answer, languages);

    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a FAQ
const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const { question, answer, languages = ["hi", "bn"] } = req.body;

  try {
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    faq.question = question;
    faq.answer = answer;

    const translations = await translateFAQ(question, answer, languages);
    faq.translations = translations;
    
    await faq.save();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a FAQ
const deleteFAQ = async (req, res) => {
  const { id } = req.params;
  try {
    await FAQ.findByIdAndDelete(id);
    res.json({ message: "FAQ deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllFAQs, createFAQ, updateFAQ, deleteFAQ };
