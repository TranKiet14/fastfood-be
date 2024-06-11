const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        phone: String,
        avatar: String,
        status: String,
        access_token: Array,
        refresh_token: Array,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Client = mongoose.model("Client", clientSchema, "clients");

module.exports = Client;