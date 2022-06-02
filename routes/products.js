const router = require('express').Router()
const ProductMock = require('../mock/products.js')
const Products = require('../models/product.model.js')


// fetching the products
router.get('/products', async (req,res,next)=>{
     
    let getproduct = await Products.find()
    res.send(getproduct)

})

// adding to db
router.post('/addproducts',async (req,res,next)=>{
    // req.body(this.name)
    try {
        await Products.insertMany(req.body)
    res.send("added sucessfully")
        
    } catch (error) {
        res.status(400).send("idk what happend ")        
    }
    

})


//fetch product with id
router.get('/products/:id',(req,res,next)=>{
    for (let index = 0; index < Products.length; index++) 
    {
        const element = Products[index];
        // console.log(element)
        if (element.id === parseInt(req.params.id)) {
            return res.send(element)
        }
        
    }
    res.send("enter a valid id")
})

module.exports = router