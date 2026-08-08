const express = require("express");
const rateLimit = require("express-rate-limit");

const adminController = require("../controllers/admin.controller");
const requireAdmin = require("../middleware/adminAuth");

const router = express.Router();

// ======================================================
// ADMIN LOGIN RATE LIMITER
// ======================================================

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// ======================================================
// PUBLIC ADMIN AUTH ROUTES
// ======================================================

router.post(
  "/login",
  loginLimiter,
  adminController.login
);

router.post(
  "/logout",
  adminController.logout
);

// ======================================================
// PROTECTED ADMIN ROUTES
// ======================================================

router.use(requireAdmin);

router.get(
  "/session",
  adminController.session
);

router.get(
  "/dashboard",
  adminController.dashboard
);

router.get(
  "/contacts",
  adminController.contacts
);

router.patch(
  "/contacts/:id",
  adminController.updateContact
);

router.delete(
  "/contacts/:id",
  adminController.deleteContact
);

router.get(
  "/subscribers",
  adminController.subscribers
);

router.patch(
  "/subscribers/:id",
  adminController.updateSubscriber
);

router.delete(
  "/subscribers/:id",
  adminController.deleteSubscriber
);

module.exports = router;