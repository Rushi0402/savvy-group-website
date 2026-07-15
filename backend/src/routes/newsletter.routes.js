const express = require("express");
const router = express.Router();

const {
  subscribe,
} = require("../controllers/newsletter.controller");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Newsletter API Working 🚀",
  });
});

router.post("/subscribe", subscribe);

module.exports = router;