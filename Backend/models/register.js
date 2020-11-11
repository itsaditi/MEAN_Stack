const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const saltRounds = 10;
 var Register = mongoose.Schema({
     username: String,
     password: String,
    
 })



 module.exports = mongoose.model('Register', Register)
