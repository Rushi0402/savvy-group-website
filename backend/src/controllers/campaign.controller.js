const prisma = require("../config/prisma");
const { transporter } = require("../config/mail");

exports.createCampaign = async (req, res) => {
  try {
    const campaign = await prisma.campaign.create({
      data: {
        title: req.body.title,
        subject: req.body.subject,
        previewText: req.body.previewText,
        type: req.body.type,
        content: req.body.content,
        status: "draft",
      },
    });

    res.status(201).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create campaign.",
    });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await prisma.campaign.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: req.body.title,
        subject: req.body.subject,
        previewText: req.body.previewText,
        type: req.body.type,
        content: req.body.content,
      },
    });

    res.json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update campaign.",
    });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: campaigns,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to load campaigns.",
    });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    await prisma.campaign.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Campaign deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete campaign.",
    });
  }
};

exports.sendCampaign = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    if (campaign.status === "sent") {
      return res.status(400).json({
        success: false,
        message: "Campaign has already been sent.",
      });
    }

    const subscribers = await prisma.subscriber.findMany({
      where: {
        isSubscribed: true,
      },
    });

    if (!subscribers.length) {
      return res.status(400).json({
        success: false,
        message: "No active subscribers found.",
      });
    }

    let sentCount = 0;
    const failed = [];

    for (const subscriber of subscribers) {
      try {
        console.log("🔥 NEW EMAIL TEMPLATE");
        await transporter.sendMail({
          from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
          to: subscriber.email,
          subject: campaign.subject,
          html: `
            <div style="max-width:700px;margin:auto;padding:30px;font-family:Arial,sans-serif;border:1px solid #e5e5e5;border-radius:12px">

              <h1 style="margin:0;color:#0b7466">
                Savvy Groupssssss
              </h1>

              <p style="margin-top:5px;color:#666">
                Resources & Managementtttt
              </p>

              <hr style="margin:25px 0">

              <h2>${campaign.title}</h2>

              <p style="font-size:16px;color:#666">
                ${campaign.previewText || ""}
              </p>

              <div style="margin-top:25px;font-size:16px;line-height:1.8;color:#333">
                ${campaign.content.replace(/\n/g, "<br>")}
              </div>

              <hr style="margin:35px 0">

              <p>
                Regards,<br>
                <strong>Team Savvy Group</strong>
              </p>

            </div>
          `,
        });

        sentCount++;

        console.log(`✅ Sent to ${subscriber.email}`);
      } catch (err) {
        console.error(`❌ Failed: ${subscriber.email}`);
        console.error(err.message);

        failed.push(subscriber.email);
      }
    }

    await prisma.campaign.update({
      where: { id },
      data: {
        status: "sent",
        sentAt: new Date(),
        recipients: sentCount,
      },
    });

    return res.json({
      success: true,
      message: `Campaign sent to ${sentCount} subscriber(s).`,
      failed,
    });
  } catch (error) {
    console.error("Campaign Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};