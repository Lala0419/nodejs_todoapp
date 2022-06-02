const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks")

// grab all the tasks
router.get("/", getAllTasks); 
// Adding new task
router.post("/", createTask); 
// grab selected task
router.get("/:id", getSingleTask); 
// apdating existing selected task 
router.patch("/:id", updateTask); 
// deleting a selected task
router.delete("/:id", deleteTask); 

module.exports = router;