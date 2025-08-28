const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
    {
        userId: {
            type: String,
            default: uuidv4, // auto-generate UUID v4
            unique: true
        },
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        // userName: {
        //   type: String,
        //   required: false,
        // },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        // mobileNumber: {
        //   type: String,
        //   unique: true,
        //   required: false,
        // },
        role: [{
            type: String,
            ref: "role",
            required: true,
        }],
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "user",
        // _id: false
    }
);
const user = mongoose.model("user", userSchema);
module.exports = user;