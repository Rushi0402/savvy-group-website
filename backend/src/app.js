const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const adminRoutes = require("./routes/admin.routes");
const campaignRoutes = require("./routes/campaign.routes");
const errorHandler = require("./middleware/error");

const app = express();

// ==========================================
// CORS Configuration
// ==========================================

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);

const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:3000"
)
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""));

const corsOptions = {
  origin(origin, callback) {
    const allowedOrigins = (
      process.env.FRONTEND_URL || ""
    )
      .split(",")
      .map((url) => url.trim().replace(/\/$/, ""));

    const requestOrigin = origin?.replace(/\/$/, "");

    console.log("================================");
    console.log("Origin:", requestOrigin);
    console.log("Allowed:", allowedOrigins);
    console.log("================================");

    if (!origin || allowedOrigins.includes(requestOrigin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],

  credentials: true,

  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ==========================================
// Body Parser
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Routes
// ==========================================

app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin/campaigns", campaignRoutes);
app.use("/api/admin", adminRoutes);

// ==========================================
// Health Check
// ==========================================

app.get("/", (req, res) => {
  res.send("Savvy Group Backend Running 🚀");
});

// ==========================================
// Error Handler
// ==========================================

app.use(errorHandler);

module.exports = app;