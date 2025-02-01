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

