const prisma = require("../config/prisma");
const { sendMail } = require("../config/mail");

exports.test = async (req, res) => {
  res.json({
    success: true,
    message: "Contact API Working 🚀",
  });
};

exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ==========================================
    // Save to Database
    // ==========================================

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        message,
      },
    });

    // ==========================================
    // Return Success Immediately
    // ==========================================

    res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: contact,
    });

    // ==========================================
    // Send Emails in Background
    // ==========================================

    (async () => {
      try {
        // Company Email
        await sendMail({
          from: `"Savvy Group Website" <${process.env.EMAIL_USER}>`,
          to: process.env.COMPANY_EMAIL,
          subject: "📩 New Contact Form Submission",

          html: `
            <h2>New Contact Inquiry</h2>

            <p><b>Name:</b> ${firstName} ${lastName}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Email:</b> ${email}</p>

            <hr/>

            <p><b>Message:</b></p>

            <p>${message}</p>
          `,
        });

        // Customer Email
        await sendMail({
          from: `"Savvy Group" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Thank You for Contacting Savvy Group",

          html: `
            <h2>Hello ${firstName},</h2>

            <p>
              Thank you for contacting <b>Savvy Group</b>.
            </p>

            <p>
              We have received your inquiry successfully.
            </p>

            <p>
              Our team will contact you shortly.
            </p>

            <br/>

            <p>
              Regards,<br/>
              <b>Savvy Group</b><br/>
              Human Resource | Security | Facility Management
            </p>
          `,
        });

        console.log("✅ Contact emails sent successfully.");

      } catch (mailError) {
        console.error("❌ Email Error:", mailError.message);
      }
    })();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};