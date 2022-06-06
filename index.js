const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const { config } = require('dotenv')
config()

////Express Config
app.use(express.json())
app.use(cors())

///Connecting to MongoDB Server
require('./database/mongoose')

///Importing Routers
const globalRouters = require('./routes')
app.use(globalRouters)


/////Start Express Application
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})


