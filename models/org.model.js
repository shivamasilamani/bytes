const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    owner : String,
    text : {
        type : String,
        required : true,
        minlength : 1
    },
    imageUrl : String,
}, {
    timestamps : true
});

const orgSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 200,
    },
    type : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 200
    },
    posts : [postSchema]
}, {
    timestamps : true
});

module.exports = mongoose.model("orgs", orgSchema);