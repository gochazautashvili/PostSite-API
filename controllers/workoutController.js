const Workout = require("../models/Workout")
const mongoose = require("mongoose")


const getWorkout = async (req, res) => {
    const user_id = req.user._id

    const workout = await Workout.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(workout)
}

const getWorkouts = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "workout not found" })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "workout not found" })
    }

    res.status(200).json(workout)
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "workout not found" })
    }

    const workout = await Workout.findByIdAndDelete(id)

    if (!workout) {
        return res.status(404).json({ error: "workout not found" })
    }

    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "workout not found" })
    }

    const workout = await Workout.findByIdAndUpdate(id, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({ error: "workout not found" })
    }

    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}