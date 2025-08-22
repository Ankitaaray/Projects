const squel = require('squel')
const {pool}=require('../db/connectpg')
const createUserTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users1(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(5)NOT NULL,
        CHECK (role IN('admin', 'user')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    
};
const findUser=async(email)=>{
    const query=squel
    .select()
    .from("Users1")
    .where("email=?", email)
    .toString();

    users=await pool.query(query)
    return users.rows[0];
};
const createUser= async(name,email,hashed_password,role)=>{
    const query=squel
    .insert()
    .into("Users1")
    .set("name", name)
    .set("email",email)
    .set("password",hashed_password)
    .set("role", role)
    .returning("*")
    .toString();

    console.log("final query:"+query)
    const users=await pool.query(query)
    console.log(users)
    return users.rows[0];
    
}
module.exports={
    createUserTable,
    createUser,
    findUser
}