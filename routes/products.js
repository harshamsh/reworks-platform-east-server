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

router.get('/products/:id',(req,res,next)=>{
    //feteching id parameter
    fetchid = req.params.id;
    //finding the value via productId field in the db
    ProductModel.find(({productId:fetchid}),function(err,val){
        res.send(val)

    })


  // for (let index = 0; index < Products.length; index++) 
    // {

    //     console.log(index)
    //     ////TODO - Harsha : Use Product data from MongoDB Product collection

    //     // const element = Products[index];
    //     // if (element.id === parseInt(req.params.id)) {
    //     //     return res.send(element)
    //     // }
        
    // }
    // res.send("enter a valid id")
})

module.exports = router