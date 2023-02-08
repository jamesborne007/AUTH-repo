
require ('dotenv').config();
const express = require('express');
const app = express();
const PORT = 1500;
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
const userRouter = require('./routes/userRouter')
const newRouter = require('./routes/newUserRouter')
app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(newRouter);

app.get("/register",(req,res)=>{
    res.render('signup')
})
app.get("/login",(req,res)=>{
    res.render('login')
})
app.get("/dashboard",(req,res)=>{
    res.render('dashboard')
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