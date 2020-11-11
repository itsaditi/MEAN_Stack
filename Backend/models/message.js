const mongoose = require("mongoose")

 var Message = mongoose.Schema({
     message: String,
     username:String,
    
 })

 module.exports = mongoose.model('Message', Message)
