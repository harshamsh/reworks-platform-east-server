const router = require('express').Router()
const { compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { v4 } = require('uuid')
const { config } = require('dotenv')
config()

////Mongoose Models
const User = require('../../models/users.model')

///Middleware
const { verifyAuth, decryptJwtToken } = require('./auth.middleware')



//////Login User
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    ////Validate User
    const isUserValid = await User.findOne({ email });
    if (!isUserValid) return res.status(400).send("Invalid Email or Password!");

    /////verify Password
    if (!compareSync(password, isUserValid.password)) return res.status(400).send("Invalid Email or Password!");

    var sessionId = v4()
  
    var jwtToken = sign({
        _id: isUserValid._id,
        role: isUserValid.roles[0],
        sessionId
      },
      process.env.JWT_SECRET
    );

  /////IGNORE FOR NOW
    await User.updateOne({ email },{
        $push: { jwt: sessionId },
      }
    );

    return res.status(200).send({
      _id: isUserValid._id,
      token: jwtToken,
      roles: isUserValid.roles,
    });

})



//////Check Auth Status (Refresh status)
router.get('/auth/refresh', verifyAuth, async (req, res) => {

  return res.send({
      ...req.userData
  })
  
})


//////Logout User
router.get('/auth/logout', decryptJwtToken, async (req, res) => {
  const { _id, sessionId } = req.userData
  
  await User.updateOne({ _id }, {
    $pull: { jwt: sessionId }
  })

  return res.status(200).send({message: 'Logged Out'})

})


module.exports = router
