const mongoose = require('mongoose');

// class EmployeeSchema 
const EmployeeSchema = new mongoose.Schema({
    //creating new objects 
    firstname:{
        // enter type of databeing entered
        type: String,
        required:true, // means this won't be saved if there's no name input inside the input field
        trim:true // removes any spaces 
    },
    lastname:{
        type:String,
        required:true,
        trim:true 
    },
    age:{
        type:Number,
        required:true,
        trim:true 
    },
    email:{
        type:String,
        unique:true,// Won't save an email more than once
        trim:true,
        required:true
    },
    telephone:{
        type:String,
        unique:true,
        trim:true,
        required:true
    }

}) 

module.exports = mongoose.model('Employee', EmployeeSchema)