require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
    
})

app.listen(port, () =>{
    console.log(`🚀 Server is up on port ${port}`)
})