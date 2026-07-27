require("dotenv").config();

const { transporter } = require("./src/config/mail");

async function run() {
  try {
    console.log("Verifying SMTP...");

    await transporter.verify();

    console.log("✅ SMTP Verified");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "SMTP Test",
      text: "Testing Gmail SMTP",
    });

    console.log("✅ Email Sent Successfully");
    console.log(info);

  } catch (err) {
    console.error("❌ SMTP ERROR");
    console.error(err);
  }
}

run();