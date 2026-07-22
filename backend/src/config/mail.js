const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async ({ from, to, subject, html }) => {
  return transporter.sendMail({
    from: from || `"Savvy Group" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = {
  transporter,
  sendMail,
};