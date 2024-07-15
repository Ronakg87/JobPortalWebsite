const mongoose = require('mongoose');

const terms = mongoose.Schema({
    term:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true});


module.exports = mongoose.model("Terms", terms);