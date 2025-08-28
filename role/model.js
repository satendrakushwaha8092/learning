const { Schema, default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const roleShema = new Schema(
    {
        roleId: {
            type: String,
            default: uuidv4
        },
        name: {
            type: String,
            required: true
        }
    }
)

const role = mongoose.model("role",roleShema)
module.exports = role