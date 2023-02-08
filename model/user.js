//email- string, unique, required, validate
//password- string,required, minlength 

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema  = new Schema({
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

//mongoose hooks
// functiion that proctect user info b4 we save
//gen salting , hashing using the salting

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)


})



module.exports = mongoose.model('User',userSchema);