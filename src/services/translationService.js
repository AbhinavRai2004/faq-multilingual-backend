const translate = require("google-translate-api-x");

const translateText = async (text, lang) => {
  try {
    const res = await translate(text, { to: lang });
    console.log(res.text);
    return res.text;
  } catch (err) {
    console.error("Translation Error:", err);
    return text;
  }
};

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
