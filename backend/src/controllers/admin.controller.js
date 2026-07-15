const prisma = require("../config/prisma");
const {
  COOKIE_NAME,
  cookieOptions,
  createSession,
  safeEqual,
} = require("../config/adminAuth");

const CONTACT_STATUSES = ["new", "in-progress", "resolved"];
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

const getLoginAttempt = (key) => {
  const attempt = loginAttempts.get(key);

  if (!attempt || Date.now() - attempt.startedAt > LOGIN_WINDOW_MS) {
    const freshAttempt = { count: 0, startedAt: Date.now() };
    loginAttempts.set(key, freshAttempt);
    return freshAttempt;
  }

  return attempt;
};

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

exports.login = async (req, res) => {
  const key = req.ip || "unknown";
  const attempt = getLoginAttempt(key);

  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again in 15 minutes.",
    });
  }

  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const adminEmail = String(process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const adminPassword = String(process.env.ADMIN_PASSWORD || "");

  if (!adminEmail || !adminPassword) {
    return res.status(503).json({
      success: false,
      message: "Admin access has not been configured.",
    });
  }

  if (
    !safeEqual(email, adminEmail) ||
    !safeEqual(password, adminPassword)
  ) {
    attempt.count += 1;
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  loginAttempts.delete(key);
  res.cookie(COOKIE_NAME, createSession(adminEmail), cookieOptions());

  return res.json({
    success: true,
    message: "Welcome back.",
    admin: { email: adminEmail },
  });
};

exports.logout = async (req, res) => {
  const options = cookieOptions();
  delete options.maxAge;
  res.clearCookie(COOKIE_NAME, options);

  return res.json({
    success: true,
    message: "Signed out successfully.",
  });
};

exports.session = async (req, res) =>
  res.json({
    success: true,
    admin: { email: req.admin.email },
  });

exports.dashboard = async (req, res, next) => {
  try {
    const [
      totalContacts,
      newContacts,
      resolvedContacts,
      totalSubscribers,
      activeSubscribers,
      recentContacts,
    ] = await prisma.$transaction([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: "new" } }),
      prisma.contact.count({ where: { status: "resolved" } }),
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { isSubscribed: true } }),
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return res.json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        resolvedContacts,
        totalSubscribers,
        activeSubscribers,
        recentContacts,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.contacts = async (req, res, next) => {
  try {
    const search = String(req.query.search || "").trim();
    const requestedStatus = String(req.query.status || "");
    const status = CONTACT_STATUSES.includes(requestedStatus)
      ? requestedStatus
      : undefined;

    const contacts = await prisma.contact.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phone: { contains: search } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ success: true, data: contacts });
  } catch (error) {
    return next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const status = String(req.body.status || "");

    if (!id || !CONTACT_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "A valid contact and status are required.",
      });
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return res.json({
      success: true,
      message: "Contact status updated.",
      data: contact,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "A valid contact is required.",
      });
    }

    await prisma.contact.delete({ where: { id } });
    return res.json({ success: true, message: "Contact deleted." });
  } catch (error) {
    return next(error);
  }
};

exports.subscribers = async (req, res, next) => {
  try {
    const search = String(req.query.search || "").trim();

    const subscribers = await prisma.subscriber.findMany({
      where: search
        ? { email: { contains: search, mode: "insensitive" } }
        : undefined,
      orderBy: { createdAt: "desc" },
    });

    return res.json({ success: true, data: subscribers });
  } catch (error) {
    return next(error);
  }
};

exports.updateSubscriber = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id || typeof req.body.isSubscribed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "A valid subscriber and state are required.",
      });
    }

    const subscriber = await prisma.subscriber.update({
      where: { id },
      data: { isSubscribed: req.body.isSubscribed },
    });

    return res.json({
      success: true,
      message: "Subscriber updated.",
      data: subscriber,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteSubscriber = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "A valid subscriber is required.",
      });
    }

    await prisma.subscriber.delete({ where: { id } });
    return res.json({ success: true, message: "Subscriber deleted." });
  } catch (error) {
    return next(error);
  }
};
