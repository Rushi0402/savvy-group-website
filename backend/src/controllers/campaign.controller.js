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
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${campaign.subject}</title>

</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 10px;">

<tr>

<td align="center">

<table
width="700"
cellpadding="0"
cellspacing="0"
style="
max-width:700px;
background:#ffffff;
border-radius:16px;
overflow:hidden;
box-shadow:0 15px 40px rgba(0,0,0,.08);
">

<!-- Banner -->

<tr>

<td>

<img
src="public/email-banner.png"
width="700"
style="display:block;width:100%;height:auto;"
alt="Savvy Group"
/>

</td>

</tr>

<!-- Company -->

<tr>

<td align="center" style="padding:40px 40px 20px;">

<h1
style="
margin:0;
font-size:38px;
color:#062c27;
">

Savvy Groups

</h1>

<p
style="
margin-top:10px;
font-size:18px;
color:#777;
">

Resources & Management

</p>

<p
style="
margin-top:8px;
font-size:16px;
font-style:italic;
color:#0b7466;
">

Think Beyond Your Boundaries

</p>

</td>

</tr>

<!-- Title -->

<tr>

<td style="padding:10px 45px;">

<h2
style="
margin:0;
font-size:32px;
color:#222;
">

${campaign.title}

</h2>

</td>

</tr>

<!-- Preview -->

<tr>

<td style="padding:10px 45px;">

<p
style="
font-size:18px;
line-height:32px;
color:#666;
">

${campaign.previewText || ""}

</p>

</td>

</tr>

<!-- Divider -->

<tr>

<td style="padding:0 45px;">

<hr style="border:none;border-top:1px solid #ececec;">

</td>

</tr>

<!-- Content -->

<tr>

<td style="padding:35px 45px;">

<div
style="
font-size:17px;
line-height:34px;
color:#444;
">

${campaign.content.replace(/\n/g,"<br>")}

</div>

</td>

</tr>

<!-- Button -->

<tr>

<td align="center" style="padding-bottom:50px;">

<a
href="https://savvy-group-website.vercel.app"
style="
background:#0b7466;
color:#ffffff;
padding:18px 40px;
border-radius:8px;
font-size:17px;
font-weight:bold;
text-decoration:none;
display:inline-block;
">

Visit Our Website

</a>

</td>

</tr>

<!-- Footer -->

<tr>

<td
style="
background:#062c27;
padding:35px;
text-align:center;
">

<p
style="
margin:0;
font-size:24px;
font-weight:bold;
color:#D6AE45;
">

Savvy Groups

</p>

<p
style="
margin:15px 0;
color:#ffffff;
font-size:15px;
">

Resources & Management

</p>

<p
style="
margin:20px 0;
color:#cfcfcf;
font-size:15px;
">

📧 ${process.env.COMPANY_EMAIL}

</p>

<p
style="
margin:0;
color:#cfcfcf;
font-size:15px;
">

🌐 https://savvy-group-website.vercel.app

</p>

<p
style="
margin-top:30px;
font-size:13px;
color:#999;
">

© ${new Date().getFullYear()} Savvy Group

<br><br>

You received this email because you subscribed to Savvy Group updates.

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
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