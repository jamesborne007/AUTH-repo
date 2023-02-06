const User = require('../model/user');
const bcrypt = require('bcrypt');

//error handling
//integrate views
// authentication - jsonwebtoken


//REGISTER
const register = async(req,res) => {
    //res.send('register user')
    const {email, password} = req.body;
    //make sure that they provide email and password
    if(!email || !password){ 
        return res.status(400).json({
            success: false,
            message: 'please provide necessary information'
        });
    }
    // email hasnt been registered
    const userExist = await User.findOne({ email })
    if (userExist){
        return res.status(400).json({
            success: false, message:'Email has been registered'
        })
    }
    // protect user info- hashing Algorithms
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    // create the user
    try{
        const user = await User.create({email, password: hashedPassword})
        res.status(201).json({success: true, data: user})

    }catch(error){
         console.log(error);
         res.status(500).json({message: error});
    }
    
};

//LOGIN
const login = async(req,res) => {
    //res.send('login user')
    const {email, password} = req.body
    //email and password
    if(!email|| !password){
        return res
        .status(400)
        .json({
            success: false ,message:'please provide necessary information'
        });
    }
    // user has registered
    const user = await User.findOne({email});
    if (!user){
        return res
        .status(400)
        .json({sucess:false, message:'Email not found,please go and sign up'});
    }
    //provide the CORRECT details, email and password
    const authenticated = user.email === email && (await bcrypt.compare(password, user.password))
    if (authenticated){
        return res.status(200).json({success:true,message:user});
    }else{
        return res.status(400).json({success:false, message:'Invalid email or password'});
    }
};

module.exports = {
    register,
    login
}