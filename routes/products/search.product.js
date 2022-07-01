const router = require('express').Router()
const { getCursor } = require('../../core/pagination/pagination')

/////Mongoose Models
const Product = require('../../models/product.model')


////Product - Search by Text
router.get('/products/search', async (req, res) => {
    let { searchKey, page = 0 } = req.query

    ////Find Cursor position
    let { skip, limit } = getCursor(page)

    var products = await Product.find({
        $text: { $search: searchKey }
    }).skip(skip).limit(limit)


    return res.send(products)
})


module.exports = router