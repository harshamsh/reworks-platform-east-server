const express = require('express')
const router = require('express').Router()
const app = express()

/////Import All Routers

const authRouter = require('./auth/auth.routes')
const userRouter = require('./users/users.routes')

///Products Router
const productRouter = require('./products/products')
const productCsvRouter = require('./products/_csv/products.csv')
const productSearchRouter = require('./products/search.product')

app.use([authRouter, userRouter, productCsvRouter, productRouter, productSearchRouter])

////Test Router
router.get('/',(req,res,next)=>{
    res.send({id:4356})
})

module.exports = app