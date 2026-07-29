require("dotenv").config();

const { transporter } = require("./src/config/mail");

async function run() {
  try {
    console.log("Verifying SMTP...");

    await transporter.verify();

    console.log("✅ SMTP Verified");

    const info = await transporter.sendMail({
      from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
      to: process.env.COMPANY_EMAIL,
      subject: "Brevo SMTP Test",
      text: "Testing Brevo SMTP",
    });

    console.log("✅ Email Sent Successfully");
    console.log(info);

  } catch (err) {
    console.error("❌ SMTP ERROR");
    console.error(err);
  }
}

run();