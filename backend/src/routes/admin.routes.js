const express = require("express");
const adminController = require("../controllers/admin.controller");
const requireAdmin = require("../middleware/adminAuth");

const router = express.Router();

router.post("/login", adminController.login);
router.post("/logout", adminController.logout);

router.use(requireAdmin);
router.get("/session", adminController.session);
router.get("/dashboard", adminController.dashboard);
router.get("/contacts", adminController.contacts);
router.patch("/contacts/:id", adminController.updateContact);
router.delete("/contacts/:id", adminController.deleteContact);
router.get("/subscribers", adminController.subscribers);
router.patch("/subscribers/:id", adminController.updateSubscriber);
router.delete("/subscribers/:id", adminController.deleteSubscriber);

module.exports = router;
