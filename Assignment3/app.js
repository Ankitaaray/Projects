const express=require('express')
const app=express()
const port=5000;
const connectDB=require('./db/connectdb')
const authMiddleware=require('./middleware/auth')
const Resouce_routes= require('./routes/routeResource');
const authorizeRoles=require('./middleware/authorizeroles')
const auth_Routes=require('./routes/authroutes')
app.use(express.json())

require('dotenv').config()

const connect=async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
    }
    catch(err){
        console.log(err)
    }
    
}
connect()
app.use('/auth',auth_Routes)

app.use('/resources',authMiddleware,authorizeRoles('admin'),Resouce_routes)

