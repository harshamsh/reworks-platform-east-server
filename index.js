const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

////Express Config
app.use(express.json())
app.use(cors())

///Connecting to MongoDB Atlas
require('./database/mongoose')

///Importing Routers
const myrouter = require('./routes/index.js')
const productsRouter = require('./routes/products.js')
app.use(productsRouter)
app.use(myrouter)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


