const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contact.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const adminRoutes = require("./routes/admin.routes");
const campaignRoutes = require("./routes/campaign.routes");
const errorHandler = require("./middleware/error");

const app = express();

// ======================================================
// BASIC SECURITY
// ======================================================

app.disable("x-powered-by");

// Security headers
app.use(helmet());

// If your backend is deployed behind a reverse proxy
app.set("trust proxy", 1);

// ======================================================
// CORS CONFIGURATION
// ======================================================

const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:3000"
)
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

console.log("================================");
console.log("Allowed CORS Origins:", allowedOrigins);
console.log("================================");

const corsOptions = {
  origin(origin, callback) {
    // Allow requests without an Origin header
    // such as Postman/server-to-server requests.
    if (!origin) {
      return callback(null, true);
    }

    const requestOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(requestOrigin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked CORS Origin:", requestOrigin);

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

// ======================================================
// RATE LIMITING
// ======================================================

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 200,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(generalLimiter);

// ======================================================
// BODY PARSER
// ======================================================

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  })
);

// ======================================================
// ROUTES
// ======================================================

app.use("/api/contact", contactRoutes);

app.use("/api/newsletter", newsletterRoutes);

app.use("/api/admin/campaigns", campaignRoutes);

app.use("/api/admin", adminRoutes);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.status(200).send("Savvy Group Backend Running 🚀");
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use(errorHandler);

module.exports = app;