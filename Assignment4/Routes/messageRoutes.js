const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  saveMessage,
  deleteMessage,
} = require("../controllers/messages");
router.route("/").get(getAllMessages).post(saveMessage);
router.route("/:id").delete(deleteMessage);
module.exports = router;