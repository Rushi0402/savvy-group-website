const express = require("express");

const router = express.Router();

const {
  test,
  createContact,
} = require("../controllers/contact.controller");

router.get("/", test);

router.post("/", createContact);

module.exports = router;