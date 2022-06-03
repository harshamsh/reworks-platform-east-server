const router = require('express').Router()
const ProductMock = require('../mock/products.js')
const ProductModel = require('../models/product.model.js')
const Products = require('../models/product.model.js')


//// Get all Products
router.get('/products', async (req,res,next)=>{
     
    let getproduct = await Products.find()
    // console.log(Products.length)
    res.send(getproduct)

})

///// Add Single/Multipl Products
router.post('/addproducts',async (req,res,next)=>{
    // req.body(this.name)
    try {
        await Products.insertMany(req.body)
    res.send("added sucessfully")
        
    } catch (error) {
        res.status(400).send("idk what happend ")        
    }
    

})


//// Fetch Product by productId

router.get('/products/:id',async (req,res,next)=>{
    //feteching id parameter
    var productId = req.params.id;
    //finding the value via productId field in the db
  
    var product = await  ProductModel.findOne({productId})
    if (!product) return res.status(404).send("check your id number")
    res.send(product)       

    })

module.exports = router