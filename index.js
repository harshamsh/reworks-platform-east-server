const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const { config } = require('dotenv')
config()

////Express Config
app.use(express.json({ limit: "10mb" }));
app.use(cors())

///Connecting to MongoDB Server
require('./database/mongoose')

///Importing Routers
const globalRouters = require('./routes')
app.use(globalRouters)


/////Start Express Application
var PORT = process.env.PORT || 5000 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})


