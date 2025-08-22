const express=require('express')
const app=express()
const port=5000;
app.use(express.json())

const authMiddleware=require('./middleware/auth')
const connectPg=require('./db/connectpg')
const PgResourceRoutes=require('./routes/pgRouteResource')
const authorizeRoles=require('./middleware/authorizeroles')
const pgAuthRoutes=require('./routes/pgAuthRoutes')
const pgAdminReservation=require('./routes/pgAdminReservation')
const pgUserReservation=require('./routes/pgUserReservation')


const reservationModel=require('./models/ResevationPgSchema')
const resourceModel=require('./models/ResourcePgSchema')
const usermodel=require('./models/userPgSchema')


reservationModel.createTable()
resourceModel.createTable()
usermodel.createUserTable()

require('dotenv').config()
connectPg.connectPostgres()

app.listen(port,()=>{console.log(`server running on port ${port}`)})

app.use('/auth',pgAuthRoutes)

app.use('/resources',authMiddleware,authorizeRoles('admin'),PgResourceRoutes)
app.use('/reservations' ,authMiddleware,(req,res,next)=>{
    if(req.user.role==='admin'){return pgAdminReservation.handle(req,res,next)}
    else if(req.user.role==='user'){return pgUserReservation.handle(req,res,next)}
    res.status(403).json({message:'Invalid Role'})
})

