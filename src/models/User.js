const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// user static method

UserSchema.statics.register = async function (email, password) {
    const exists = await this.findOne({ email })

    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Your email is not good")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Your password is not good")
    }

    if (exists) {
        throw Error("Email is already exist")
    }

    const hash = await bcrypt.hash(password, 10)

    const user = this.create(({ email, password: hash }))

    return user
}

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    if (!user) {
        throw Error("Email is not exist")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Password is not exist")
    }

    return user
}

module.exports = mongoose.model("User", UserSchema)