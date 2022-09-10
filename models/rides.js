const mongoose = require("mongoose");
var RidesSchema = mongoose.Schema({
    UID:String,
    firstName: String,
    lastName: String,
    email: String,
    mno: String,
    licenseno: String,
    from: String,
    fromlat: Number,
    fromlan: Number,
    fromstate: String,
    fromcity: String,
    dest: String,
    destlat: Number,
    destlan: Number,
    deststate: String,
    destcity: String,
    datetime: String,
    seats: Number,
    avlseats:Number
});
var RidesModel = mongoose.model("Rides", RidesSchema);
module.exports = RidesModel;