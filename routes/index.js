const router = require('express').Router()

////Test Router
router.get('/',(req,res,next)=>{
    res.send({id:4356})
})

module.exports = router