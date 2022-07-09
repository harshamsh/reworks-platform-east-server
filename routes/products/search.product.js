const router = require('express').Router()
const { getCursor } = require('../../core/pagination/pagination')

/////Mongoose Models
const Product = require('../../models/product.model')


////Product - Search by Text
router.get('/products/search', async (req, res) => {
    let { searchKey, page = 0 } = req.query

    ////Find Cursor position
    let { skip, limit } = getCursor(page)

    ////Mongo Query
    let _query = {};
    if (searchKey) _query = { $text: { $search: searchKey } };


    var products = await Product.find(_query).skip(skip).limit(limit)

    return res.send(products)
})



//////Dashboard
router.get('/products/dashboard', async (req, res) => {
    
    var products = await Product.aggregate([
        {
            $project: {
                name: 1
            }
        },
        {
            $match: {
                name: {
                    $regexMatch: {input: 'nike', regex: 'i'}
                }
            }
        },
        {
            $group: {
                _id: '$name',
                total: {$sum: 1}
            }
        }
    ])

    res.send(products)

})


module.exports = router