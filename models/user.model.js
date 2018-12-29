const mongoose = require("mongoose");
const orgModel = require("./org.model");

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    name : {
        type: String,
    },
    imageUrl : {
        type: String
    },
    isActive : {
        type: Boolean
    },
    organization: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'orgModel',
        required: true
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("users", userSchema);