const { verify } = require('jsonwebtoken')
const { config } = require('dotenv')
config()

//////Mongoose Models
const User = require('../../models/users.model')
const req = require('express/lib/request')


//////Validate User Session
const verifyAuth = async (req, res, next) => {
    
    try {
        /////Destructure and validate token
        const token = (req.headers.authorization).split(" ")[1]
        if (!token) return res.status(401).send('Bearer Token Missing in Request Headers')
        
        /////Decrypt JWT Token
        var decrypt = verify(token, process.env.JWT_SECRET)
        var jwtUuid = decrypt.sessionId

        /////validate Session from DB
        var isUserSessionValid = await User.findOne({ jwt: jwtUuid })
        if(!isUserSessionValid) throw new Error()

        req.userData = decrypt
        req.jwtToken = token

        next() //Pass to next Handler
        
    } catch (error) {
        return res.status(401).send({message: 'Session Invalid'})
    }

}


const decryptJwtToken = (req, res, next) => {

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw Error();

      var decrypt = verify(token, process.env.JWT_SECRET);
      req.userData = decrypt;
      req.jwtToken = token;

      next(); //Pass to next Handler
    } catch (error) {

      req.userData = {};
      next(); //Pass to next Handler
        
    }
}



module.exports = {
    verifyAuth,
    decryptJwtToken
}