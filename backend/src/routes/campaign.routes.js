const express = require("express");

const router = express.Router();

const controller = require("../controllers/campaign.controller");
const adminAuth = require("../middleware/adminAuth");

// Protect all campaign routes
router.use(adminAuth);

// Get all campaigns
router.get("/", controller.getCampaigns);

// Create campaign
router.post("/", controller.createCampaign);

// Update campaign
router.patch("/:id", controller.updateCampaign);

// Send campaign
router.post("/:id/send", controller.sendCampaign);

// Delete campaign
router.delete("/:id", controller.deleteCampaign);

module.exports = router;