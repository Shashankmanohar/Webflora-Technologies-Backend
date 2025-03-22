const mongoose = require('mongoose');

const classname = new mongoose.Schema({
    school:{type:mongoose.Schema.ObjectId,ref:'School'},
    class_text:{type:String, required:true},
    class_num:{type:Number, required:true},
    attandance:{type:mongoose.Schema.ObjectId,ref:"Teacher"},
    createAt:{type:Date,default:new Date()}
})

module.exports = mongoose.model("Class", classname)