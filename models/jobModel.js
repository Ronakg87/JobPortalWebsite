const mongoose = require("mongoose");

const jobschema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    jobTitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    jobDesc:{
        type: String,
        required: true
    },
    terms:{
        type: String,
        required: true
    },
    companyLogo:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    contactNo:{
        type: String
    },
    address:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    website:{
        type:String
    },
    appEmail:{
        type:String,
        required: true
    },
    appWebLink:{
        type:String,
        required: true
    },

},{timestamps:true});

module.exports = mongoose.model("jobs", jobschema);