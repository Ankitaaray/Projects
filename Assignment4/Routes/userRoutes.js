const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
} = require("../controllers/users");
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").delete(deleteUser).patch(updateUser);
module.exports = router;