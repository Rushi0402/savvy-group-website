const {
  COOKIE_NAME,
  verifySession,
} = require("../config/adminAuth");

const getCookies = (header = "") =>
  header.split(";").reduce((cookies, entry) => {
    const [name, ...valueParts] = entry.trim().split("=");

    if (name) {
      cookies[name] = decodeURIComponent(valueParts.join("="));
    }

    return cookies;
  }, {});

const requireAdmin = (req, res, next) => {
  // ✅ Allow browser preflight requests
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const cookies = getCookies(req.headers.cookie);
    const session = verifySession(cookies[COOKIE_NAME]);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Your admin session has expired. Please sign in again.",
      });
    }

    req.admin = session;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireAdmin;