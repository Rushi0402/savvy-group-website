const prisma = require("../config/prisma");
const { transporter } = require("../config/mail");

exports.test = async (req, res) => {
  res.json({
    success: true,
    message: "Contact API Working 🚀",
  });
};

exports.createContact = async (req, res) => {
  try {
    console.log("========== CONTACT REQUEST ==========");
    console.log(req.body);

    const { firstName, lastName, phone, email, message } = req.body;

    if (!firstName || !lastName || !phone || !email || !message) {
      console.log("❌ Validation Failed");

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("✅ Validation Passed");

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        message,
      },
    });

    console.log("✅ Saved to Database");

    console.log("🔄 Verifying SMTP...");

    await transporter.verify();

    console.log("✅ SMTP Verified");

    console.log("📧 Sending Company Email...");

    const companyInfo = await transporter.sendMail({
      from: `"Savvy Group Website" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      subject: "📩 New Contact Form Submission",
      html: `
        <h2>New Contact Inquiry</h2>

        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>

        <hr>

        <p><b>Message:</b></p>

        <p>${message}</p>
      `,
    });

    console.log("✅ Company Email Sent");
    console.log(companyInfo.response);

    console.log("📧 Sending Customer Email...");

    const customerInfo = await transporter.sendMail({
      from: `"Savvy Group" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Contacting Savvy Group",
      html: `
        <h2>Hello ${firstName},</h2>

        <p>Thank you for contacting <b>Savvy Group</b>.</p>

        <p>We have received your enquiry successfully.</p>

        <p>Our team will contact you shortly.</p>

        <br>

        <p>
          Regards,<br>
          <b>Savvy Group</b>
        </p>
      `,
    });

    console.log("✅ Customer Email Sent");
    console.log(customerInfo.response);

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: contact,
    });

  } catch (error) {
    console.error("❌ CONTACT CONTROLLER ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};