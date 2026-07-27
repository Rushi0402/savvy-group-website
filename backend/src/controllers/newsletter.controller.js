const prisma = require("../config/prisma");
const { transporter } = require("../config/mail");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Check duplicate subscriber
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You are already subscribed.",
      });
    }

    // Save subscriber
    await prisma.subscriber.create({
      data: { email },
    });

    console.log("✅ Subscriber Saved");

    const fromAddress = `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`;

    // Send welcome email (don't fail subscription if email fails)
    try {
      const welcome = await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: "Welcome to Savvy Group Newsletter",
        html: `
          <h2>Welcome to Savvy Group</h2>

          <p>Thank you for subscribing to our newsletter.</p>

          <p>You will now receive updates about:</p>

          <ul>
            <li>Recruitment</li>
            <li>Security Services</li>
            <li>Housekeeping</li>
            <li>Facility Management</li>
            <li>Career Opportunities</li>
          </ul>

          <br>

          <p>
            Regards,<br>
            <b>Savvy Group</b>
          </p>
        `,
      });

      console.log("✅ Welcome Email Sent");
      console.log(welcome.response);

    } catch (err) {
      console.error("❌ Welcome Email Failed");
      console.error(err.message);
    }

    // Notify company
    try {
      const admin = await transporter.sendMail({
        from: fromAddress,
        to: process.env.COMPANY_EMAIL,
        subject: "New Newsletter Subscriber",
        html: `
          <h3>New Newsletter Subscriber</h3>

          <p><b>Email:</b> ${email}</p>
        `,
      });

      console.log("✅ Admin Email Sent");
      console.log(admin.response);

    } catch (err) {
      console.error("❌ Admin Email Failed");
      console.error(err.message);
    }

    return res.status(201).json({
      success: true,
      message: "Subscribed Successfully.",
    });

  } catch (error) {
    console.error("❌ Newsletter Error");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};