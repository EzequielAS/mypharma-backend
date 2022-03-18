require('dotenv').config()
require('./src/db/mongoose')
const express = require('express')
const cors = require('cors')
const UserRoute = require('./src/routes/UserRoute')
const BrandRoute = require('./src/routes/BrandRoute')
const CategoryRoute = require('./src/routes/CategoryRoute')
const ProductRoute = require('./src/routes/ProductRoute')
const app = express()
const port = process.env.PORT || 3000

const whitelist = ['https://mypharma-frontend.vercel.app/', 'https://www.mypharma-frontend.vercel.app/']

const corsOptions = {
   origin: function(origin, callback){
      if(!origin) 
         return callback(null, true)

      if(whitelist.indexOf(origin) === -1){
        let msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.'

        return callback(new Error(msg), false)
      }

      return callback(null, true)
    }
}

app.use(cors(corsOptions));

app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Hello world')   
})

app.use('/user', UserRoute)
app.use('/brand', BrandRoute)
app.use('/category', CategoryRoute)
app.use('/product', ProductRoute)


app.listen(port, () =>{
    console.log(`🚀 Server is up on port ${port}`)
})