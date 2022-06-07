const router = require('express').Router()


////Mongoose Models
const Product = require('../../../models/product.model')


//////CSV Import - Produts
router.post("/products/csv/import", async (req, res) => {

    try {
        const { products } = req.body
        
        //////Validate and Import Products
        var temp = []
        for (let index = 0; index < products.length; index++) {

          /////Check Duplication
          var checkProducts = await Product.countDocuments({
            productId: products[index].productId,
          });

          if (checkProducts !== 0) continue;
          
          /////Separating tags
            var productTags = (products[index].tags.toString()).split(",")
            products[index].tags = productTags
            
            
          temp.push(products[index]);
        }

        await Product.insertMany(temp);

        return res.send({
            status: 'ok',
            message: 'Product Import Successful'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "CSV Import Failed" });
    }
   
});


module.exports = router