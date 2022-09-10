const mongoose = require("mongoose");
var SharedRidesSchema = mongoose.Schema({
    rid:String,
    did:String,
    pid:String,
    dmno:String,
    pmno:String,
    dname:String,
    pname:String,
    dmail:String,
    pmail:String
    });
    var SharedRidesModel = mongoose.model("SharedRides", SharedRidesSchema); 
module.exports = SharedRidesModel;
      