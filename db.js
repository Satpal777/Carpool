const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.URIMONGODB

const connectToDb = () => {
    mongoose.connect(mongoURI,()=>{
        console.log("connected Successfully")
    })
}
module.exports = connectToDb