const prisma = require("../config/prisma");
const { sendMail } = require("../config/mail");

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

exports.deleteCampaign = async (req, res, next) => {
  try {
    await prisma.campaign.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.sendCampaign = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // Find campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    // Get active subscribers
    const subscribers = await prisma.subscriber.findMany({
      where: {
        isSubscribed: true,
      },
    });

    if (subscribers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active subscribers found.",
      });
    }

    // Send email to each subscriber
    for (const subscriber of subscribers) {
      await sendMail({
        to: subscriber.email,
        subject: campaign.subject,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:30px;border:1px solid #ddd;border-radius:10px">

            <h1 style="color:#0b7466">
              Savvy Group
            </h1>

            <p style="color:#666">
              Resources & Management
            </p>

            <hr>

            <h2>${campaign.title}</h2>

            <p style="font-size:16px;color:#555">
              ${campaign.previewText}
            </p>

            <div style="margin-top:25px;font-size:16px;line-height:1.8">
              ${campaign.content.replace(/\n/g, "<br>")}
            </div>

            <hr style="margin-top:40px">

            <p>
              Regards,<br>
              <strong>Savvy Group</strong>
            </p>

          </div>
        `,
      });
    }

    // Update campaign
    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: {
        status: "sent",
        sentAt: new Date(),
        recipients: subscribers.length,
      },
    });

    return res.json({
      success: true,
      message: `Campaign sent to ${subscribers.length} subscribers.`,
      data: updatedCampaign,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};