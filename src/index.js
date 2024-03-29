const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config()

const workoutsRoutes = require("./routes/workouts")
const userRouter = require("./routes/user")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("My API")
})

app.use("/api", workoutsRoutes)
app.use("/user", userRouter)


const PORT = process.env.PORT || 4000

// API
mongoose.connect(process.env.MONG_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`server is running ${PORT}`)
    });
}).catch(err => console.log(err))
