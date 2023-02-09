
require ('dotenv').config();
const express = require('express');
const app = express();
const PORT = 1500;
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
const userRouter = require('./routes/userRouter')
const newRouter = require('./routes/newUserRouter')
const cookieparser = require('cookie-parser')
app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

//routes
app.use(newRouter);

app.get("/register",(req,res)=>{
    res.render('signup')
})
app.get("/login",(req,res)=>{
    res.render('login')
})


//set cookies
app.get('/example',(req, res) => {
    res.cookie('isAdmin', true);
    //milliseconds
    res.cookie('another',false, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,});
    res.send('cookies set')
})

app.get ('/get',(req, res) => {
    const cookies = req.cookies;
    const {isAdmin} = cookies;
    res.json(cookies);
})


//error route
app.use(notFound);


const startserver = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
}
startserver()


