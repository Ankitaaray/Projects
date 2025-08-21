// const pg= require('pg');
// const client = new Client({
//     host:"127.0.0.1",
//     user:"postgres",
//     port:"5432",
//     password:"argusadmin",
//     database:"Task Manager"
// })
// client.connect().then(console.log("connected"));
// module.exports=client;


// const pool = new Pool({
//     user: "postgres",
//     host: "127.0.0.1",
//     database: "Task Manager",
//     password:"argusadmin",
//     port: "5432",
// });
// const { Client } = require('pg');
// const client = new Client({
//       connectionString: process.env.DATABASE_URL,
//     });
const { Pool } = require('pg');
require('dotenv').config()


const pool=new Pool({
    connectionString: process.env.DATABASE_URL,
});

const connectPostgres= async()=>{
    try{
        await pool.query('SELECT NOW()')
        console.log('Postgres connected')

    }
    catch(err){
        console.log('Not connected...')
        console.log(err);

    }
}

module.exports={
    connectPostgres,
    pool
}
// module.exports = {
//     query: (text, params) => pool.query(text, params),
// };
