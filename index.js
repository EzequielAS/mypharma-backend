require('dotenv').config()
require('./src/db/mongoose')
const express = require('express')
const cors = require('cors')
const UserRoute = require('./src/routes/UserRoute')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
    origin: "*"
}))


app.use('/user', UserRoute)


app.listen(port, () =>{
    console.log(`🚀 Server is up on port ${port}`)
})