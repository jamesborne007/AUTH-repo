
const Users = require('../model/user')
const bcrypt = require('bcrypt')
const handleErrors = require('../middleware/handleErrors')

const jwt = require('jsonwebtoken')


//headers, payload-id, signature
const generateToken =(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'3d'});
}




const register = async(req,res) => {
   // res.send('Register user')
   const {email, password} = req.body
   try{
    //protect user info
    //create the user on the database
    const user = await Users.create({email, password});
    res.status(201).json({success: true, data: user});
   } catch(error){
    //console.log(error);
    const errors = handleErrors(error);
    res.status(400).json({success:false, errors})
    //handle errors in the catch block
   }
}

const login = async(req,res) => {
    //res.send('Login user')
    const {email, password} = req.body;
    try{
        //check
        if( !email||!password){
            return res.status(400).json({success: false, message:'not correct'})
        }
        //email is registered
        const user = await Users.findOne({email});
        if(user){
            const authenticated = await bcrypt.compare(password, user.password)
            if(authenticated){
                //token set
                const token = generateToken(user._id);
                //console.log(token);
                const time = 3 * 24 * 60 * 60 * 1000;
                console.log(token)
                res.cookie('jwt', token, {maxAge: time})
                return res.status(201).json({success: true, data:user})
            }
            throw Error('Invalid email or password')
        }
        throw Error('User not registered yet');

    }catch(error){
        const errors = handleErrors(error);
        res.status(400).json({success: true, errors})
    }
}


const logout = (req, res) => {
    res.cookie('jwt', ' ',{ maxAge: 1000})
    res.redirect('/login')
}

module.exports = { register, login , logout};