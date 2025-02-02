const request = require("supertest");
const app = require("../src/app");
const FAQ = require("../src/models/faqModel");

describe("FAQ API", () => {
  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  it("should create a new FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({
        question: "Test?",
        answer: "Test!",
        languages: ["hi", "bn"], 
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.question).toBe("Test?");
    expect(res.body.translations).toBeDefined();
  });

  it("should get all FAQs", async () => {
    const faq = new FAQ({
      question: "Test FAQ",
      answer: "Test Answer",
      translations: new Map([
        ["hi", { question: "परिक्षण प्रश्न?", answer: "परिक्षण उत्तर" }],
        ["bn", { question: "পরীক্ষা প্রশ্ন?", answer: "পরীক্ষা উত্তর" }],
      ]),
    });
    await faq.save();

    const res = await request(app).get("/api/faqs?lang=hi");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].question).toBe("परिक्षण प्रश्न?");
  });

  it("should update an existing FAQ", async () => {
    const faq = new FAQ({
      question: "Old Question",
      answer: "Old Answer",
      translations: [],
    });
    await faq.save();

    const res = await request(app)
      .put(`/api/faqs/${faq._id}`)
      .send({
        question: "Updated Question",
        answer: "Updated Answer",
        languages: ["hi", "bn"],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.question).toBe("Updated Question");
    expect(res.body.translations).toBeDefined();
  });

  it("should delete an FAQ", async () => {
    const faq = new FAQ({
      question: "Delete Me",
      answer: "I should be deleted.",
      translations: [],
    });
    await faq.save();

    const res = await request(app)
      .delete(`/api/faqs/${faq._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("FAQ deleted");

    const deletedFAQ = await FAQ.findById(faq._id);
    expect(deletedFAQ).toBeNull();
  });
});
