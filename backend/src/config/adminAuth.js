const crypto = require("crypto");

const COOKIE_NAME = "savvy_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

const encode = (value) => Buffer.from(value).toString("base64url");
const decode = (value) =>
  Buffer.from(value, "base64url").toString("utf8");

const getSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must contain at least 32 characters",
    );
  }

  return secret;
};

const sign = (value) =>
  crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");

const safeEqual = (left, right) => {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const createSession = (email) => {
  const payload = encode(
    JSON.stringify({
      email,
      expiresAt:
        Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
    }),
  );

  return `${payload}.${sign(payload)}`;
};

const verifySession = (token) => {
  if (!token || !token.includes(".")) return null;

  const [payload, signature] = token.split(".");

  if (!payload || !signature || !safeEqual(signature, sign(payload))) {
    return null;
  }

  try {
    const session = JSON.parse(decode(payload));

    if (
      !session.email ||
      !session.expiresAt ||
      session.expiresAt < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

const cookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: SESSION_DURATION_SECONDS * 1000,
    path: "/",
  };
};

module.exports = {
  COOKIE_NAME,
  cookieOptions,
  createSession,
  safeEqual,
  verifySession,
};
