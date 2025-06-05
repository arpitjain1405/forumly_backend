const mongoose = require('mongoose')
const Joi = require('joi');

exports.validateUser = function(user){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50).trim(),
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(6).max(255)
    })
    return schema.validate(user);
}
exports.validateLogin = function(user){
    const schema = Joi.object({
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(6).max(255)
    })
    return schema.validate(user);
}

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength:5,
        maxLength:255
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    }
})

exports.User = mongoose.model('User', userSchema);