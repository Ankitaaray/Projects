const express=require('express')
const app=express()
const port=5000;
app.use(express.json())

const connectDB=require('./db/connectdb')
const authMiddleware=require('./middleware/auth')
const Resouce_routes= require('./routes/routeResource');
const authorizeRoles=require('./middleware/authorizeroles')
const auth_Routes=require('./routes/authroutes')
const adminreservation=require('./routes/adminReservation')
const UserReservation=require('./routes/UserReservation')

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
app.listen(port,()=>{console.log(`server running on port ${port}`)})

app.use('/auth',auth_Routes)

app.use('/resources',authMiddleware,authorizeRoles('admin'),Resouce_routes)
app.use('/reservations' ,authMiddleware,(req,res,next)=>{
    if(req.user.role==='admin'){return adminreservation.handle(req,res,next)}
    else if(req.user.role==='user'){return UserReservation.handle(req,res,next)}
    res.status(403).json({message:'Invalid Role'})
})

