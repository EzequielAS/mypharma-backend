require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const UserRoute = require('./routes/UserRoute')
const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())


app.use('/users', UserRoute)

app.listen(port, () =>{
    console.log(`🚀 Server is up on port ${port}`)
})