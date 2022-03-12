const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true})

let db = mongoose.connection

db.on('error', () => { console.log('Error in acess') })
db.once('open', () => { console.log(' Data Base loaded') })