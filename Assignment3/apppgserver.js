const express=require('express')
const app=express()
const port=5000;
app.use(express.json())

const authMiddleware=require('./middleware/auth')
const connectPg=require('./db/connectpg')
const PgResource_routes=require('./routes/pgrouteResource')
const authorizeRoles=require('./middleware/authorizeroles')
const pg_auth_routes=require('./routes/pgauthroutes')
const pg_admin_reservation=require('./routes/pgadminreservation')
const pg_user_Reservation=require('./routes/pguserReservation')


const reservationModel=require('./models/Resevation_pg_Schema')
const resourceModel=require('./models/ResourcepgSchema')
const usermodel=require('./models/UserPgSchema')


reservationModel.createTable()
resourceModel.createTable()
usermodel.createUserTable()

require('dotenv').config()
connectPg.connectPostgres()

app.listen(port,()=>{console.log(`server running on port ${port}`)})

app.use('/auth',pg_auth_routes)

app.use('/resources',authMiddleware,authorizeRoles('admin'),PgResource_routes)
app.use('/reservations' ,authMiddleware,(req,res,next)=>{
    if(req.user.role==='admin'){return pg_admin_reservation.handle(req,res,next)}
    else if(req.user.role==='user'){return pg_user_Reservation.handle(req,res,next)}
    res.status(403).json({message:'Invalid Role'})
})

