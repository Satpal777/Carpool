const mongoose = require("mongoose");
 var UsersSchema = mongoose.Schema({
     firstName: String,
     lastName: String,
     email:String,
     mno: String,
     password:String,
     licenseno:String,
     tmc: Boolean,
     rides: Array
 });
 var UsersModel = mongoose.model("CarpoolUsers", UsersSchema); 
 module.exports = UsersModel;
   
  

