const connectToDb = require('./db')
const cors = require('cors');
var UsersRouter = require('./routes/routes');
connectToDb()

const express = require('express')
const app = express()
const port = 3000
app.use(cors({
    origin: '*'
  }));
app.use(express.json())
app.use('/api', UsersRouter);


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})