const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const FAQ = require('./models/faqModel'); 
const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs');
const AdminBroMongoose = require('@admin-bro/mongoose');

dotenv.config();
const app = express();
connectDB();

// AdminJS Setup
AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    resources: [FAQ], 
    rootPath: '/admin',
});

const router = AdminBroExpressjs.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/faqs", require("./routes/faqRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;