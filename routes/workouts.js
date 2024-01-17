const express = require("express")
const { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/", getWorkout)

router.post("/", createWorkout)

router.get("/:id", getWorkouts)

router.delete("/:id", deleteWorkout)

router.patch("/:id", updateWorkout)

module.exports = router