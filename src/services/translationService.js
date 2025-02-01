const translate = require("google-translate-api");

const translateText = async (text, lang) => {
  try {
    const res = await translate(text, { to: lang });
    return res.text;
  } catch (err) {
    console.error("Translation Error:", err);
    return text;
  }
};

module.exports = { translateText };