const mongoose = require('mongoose');
const mongoURI = [YOUR_MONOGDB_URL]

const connectToDb = () => {
    mongoose.connect(mongoURI,()=>{
        console.log("connected Successfully")
    })
}
module.exports = connectToDb