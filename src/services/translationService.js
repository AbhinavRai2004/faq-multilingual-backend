const translate = require("google-translate-api-x");

// Translates the given text to the specified language.
const translateText = async (text, lang) => {
  try {
    const res = await translate(text, { to: lang });
    return res.text;
  } catch (err) {
    console.error("Translation Error:", err);
    return text;
  }
};

// Translates the given question and answer to the specified languages.
const translateFAQ = async (question, answer, languages) => {
  const translations = {};
  for (const lang of languages) {
    translations[lang] = {
      question: await translateText(question, lang),
      answer: await translateText(answer, lang),
    };
  }
  return translations;
};

module.exports = { translateText, translateFAQ };