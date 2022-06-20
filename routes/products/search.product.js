const router = require('express').Router()

/////Mongoose Models
const Product = require('../../models/product.model')



//////Product - Search by Text
router.post('/products/search', async (req, res) => {
    let { searchKey } = req.body

    var products = await Product.find({
        $text: { $search: searchKey }
    }).limit(50)

    return res.send(products)

})


module.exports = router