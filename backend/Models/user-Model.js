const mongoose = require('mongoose');
const joi = require('joi')
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})
module.exports=mongoose.model('User',userSchema)