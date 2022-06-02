const express = require('express')
const cors = require('cors')
const app = express()

// testing data
app.use(express.json())
//cors
app.use(cors())

//importing mongodb 
require('./database/mongoose')

// importing router
const myrouter=require('./routes/index.js')
const productsRouter = require('./routes/products.js')
app.use(productsRouter)
app.use(myrouter)
app.listen(5000,()=>{
    console.log("its working")
})


