const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  logger: true,
  debug: true,
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP Verify Failed");
    console.error(err);
  } else {
    console.log("✅ SMTP Server Ready");
  }
});

module.exports = {
  transporter,
};