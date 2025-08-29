const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  deleteTasks,
  getSingleTask,
  updateTask,
} = require("../controllers/pgTaskConrols");
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").delete(deleteTasks).get(getSingleTask).patch(updateTask);
module.exports = router;
