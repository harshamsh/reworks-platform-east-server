const express = require('express')
const router = require('express').Router()
const app = express()

/////Import All Routers
const authRouter = require('./auth/auth.routes')
const userRouter = require('./users/users.routes')
const productRouter = require('./products/products')
const productCsvRouter = require('./products/_csv/products.csv')


app.use([authRouter, userRouter, productCsvRouter, productRouter])

////Test Router
router.get('/',(req,res,next)=>{
    res.send({id:4356})
})

module.exports = app