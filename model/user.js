//email- string, unique, required, validate
//password- string,required, minlength 

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userAuth  = new Schema({
    email:{
        type: String,
        unique: [true, 'please provide an email'],
        required: [true, 'This email has been registered '],
        validate:[isEmail , 'please enter a valid email']
    },
    password: { 
        type: String,
        required: [true, 'please provide a password'],
        minlength: [10, 'the minimum password length is 10']
    }
},{timestamps: true}
) 

module.exports = mongoose.model('user',userAuth);