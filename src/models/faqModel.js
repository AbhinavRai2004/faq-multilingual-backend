const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    type: Map,
    of: new mongoose.Schema({
      question: String,
      answer: String
    }),
    default: {}
  }
});

faqSchema.methods.getTranslatedFAQ = function (lang) {
  const translation = this.translations.get(lang);

  return {
    question: translation?.question || this.question,
    answer: translation?.answer || this.answer,
  };
};

module.exports = mongoose.model("FAQ", faqSchema);