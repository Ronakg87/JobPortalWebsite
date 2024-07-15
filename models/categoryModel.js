const mongoose = require("mongoose");

const category = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Category", category);