const { Schema, model } = require('mongoose')


const User = new Schema({
    name: String,

    email: String,

    password: String,

    jwt: [String],

})


const UserSchema = model('users', User)

module.exports = UserSchema