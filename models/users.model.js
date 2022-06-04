const { Schema, model } = require('mongoose')


const User = new Schema({
    name: String,

    email: String,

    password: String,

    roles: {
        type: [String],
        default: ['admin']
    },

    jwt: [String],

})


const UserSchema = model('users', User)

module.exports = UserSchema