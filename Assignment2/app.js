const express=require('express')
const app=express()
const port=5000;
//const managetasks=require('./routes/Taskrouting')
//const connectDB=require('./db/connectdb')
require('dotenv').config()
const {createTable}=require('./models/pgTaskModels')
const taskRoutes=require('./routes/pgTaskRouting');
//const {connectPostgres}=require('./db/connectpg');
app.use(express.json())

//connectPostgres();
createTable();
app.use("/tasks",taskRoutes);
// app.use("/tasks",managetasks);
app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})

// const connect=async ()=>{
//     try{
//         await connectDB(process.env.MONGO_URL)
//     }
//     catch(err){
//         console.log(err)
//     }
    
// }
// connect()
app.listen(port, console.log(`Server listening at port : ${port}`));




