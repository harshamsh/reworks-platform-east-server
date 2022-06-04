const router = require('express').Router()
const { hashSync } = require('bcrypt')

//////Mongoose Models
const User = require('../../models/users.model')




/////////CRUD
//////Create User
router.post('/users', async (req, res) => {
    const payload = { ...req.body }
    payload.password = hashSync(payload.password, 12)

    /////Check User Duplication
    const isUserExists = await User.findOne({ email: payload.email })
    if (isUserExists) return res.status(409).send('user Already Exists')
    
    await User.insertMany(payload)

    return res.send({ message: 'User Created' })

})


///////View All Users
router.get('/users', async (req, res) => {
    
    /// !!!NOTE - Limiting results to 20 products
    var users = await User.find({}, {
        password: 0,
        jwt: 0
    }).limit(20).lean()
    
    return res.send(users)
})


///////Edit a User
router.patch('/user/:userId', async (req, res) => {
    const { userId } = req.params
    
    var updatePayload = {
        name: req.body.name,
        email: req.body.email
    }

    await User.updateOne({ _id: userId }, {
        $set: updatePayload
    })

    return res.send({ ...req.body })

})


//////Delete a User
router.delete('/user/:userId', async(req, res) => {
    const { userId } = req.params
    
    await User.deleteOne({ userId })
    res.send({ message: 'User Deleted' })

})


module.exports = router