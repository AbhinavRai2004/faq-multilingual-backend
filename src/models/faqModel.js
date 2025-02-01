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

module.exports = mongoose.model("FAQ", faqSchema);