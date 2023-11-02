const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        max: 25,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        max: 25,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarimage:{
        type: String,
        default:""
    },
});

module.exports = mongoose.model("Users", userSchema);