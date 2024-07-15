const mongoose = require("mongoose");

const user = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    terms:{
        type:Boolean,
        required:true,
        default:false
    }
    // image:{
    //     type:String,
    //     required:true
    // },
    // mobile:{
    //     type:String,
    //     required:true
    // },
    // type:{
    //     type:Number,
    //     required:true
    // }
},{timestamps:true});

module.exports = mongoose.model("User", user);