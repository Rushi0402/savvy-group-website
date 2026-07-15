const prisma = require("../config/prisma");
const { sendMail } = require("../config/mail");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check duplicate
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You are already subscribed.",
      });
    }

    // Save to DB
    await prisma.subscriber.create({
      data: { email },
    });

    // Welcome email
    await sendMail({
      to: email,
      subject: "Welcome to Savvy Group Newsletter",
      html: `
        <h2>Welcome to Savvy Group</h2>

        <p>Thank you for subscribing to our newsletter.</p>

        <p>
        You will receive updates about:
        </p>

        <ul>
          <li>Recruitment</li>
          <li>Security Services</li>
          <li>Housekeeping</li>
          <li>Facility Management</li>
          <li>Career Opportunities</li>
        </ul>

        <br>

        <b>Regards,</b><br>
        Savvy Group
      `,
    });

    // Notify Admin
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: "New Newsletter Subscriber",
      html: `
        <h3>New Subscriber</h3>

        <p><b>Email:</b> ${email}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Subscribed Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};