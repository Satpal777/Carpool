const connectToDb = require('./db')
const cors = require('cors');
var UsersRouter = require('./routes/routes');
connectToDb()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
app.use(cors({
    origin: '*'
  }));
app.use(express.json())
const path = require('path');
app.use(express.static(path.join(__dirname,'public')))
console.log(path.join(__dirname,'public'));
app.use('/api', UsersRouter);
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})