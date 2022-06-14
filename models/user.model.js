const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: false},
    googleId: { type: String, required: false},
    id: { type: String}
})

module.exports = mongoose.model("User", userSchema)