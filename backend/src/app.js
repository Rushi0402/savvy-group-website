const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const adminRoutes = require("./routes/admin.routes");
const campaignRoutes = require("./routes/campaign.routes");
const errorHandler = require("./middleware/error");

const app = express();

const corsOptions = {
  origin(origin, callback) {
    const allowedOrigins = (
      process.env.FRONTEND_URL || "http://localhost:3000"
    )
      .split(",")
      .map((value) => value.trim());

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },

  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],

  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin/campaigns", campaignRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Savvy Group Backend Running 🚀");
});

app.use(errorHandler);

module.exports = app;