const squel = require('squel')
const {pool}=require('../db/connectpg')
const createUserTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100)NOT NULL,
        password VARCHAR(20)NOT NULL,
        role VARCHAR(5)NOT NULL,
        CHECK (role IN('admin', 'user'))
        );
    `)
    
};
const findUser=async(email,password)=>{
    const query=squel
    .select()
    .from("Users")
    .where("email=?", email)
    .where("password=?", password)
    .toString();

    users=await pool.query(query)
    return users.rows[0];
};
const createUser= async(name,email,password,role)=>{
    const query=squel
    .insert()
    .into("Users")
    .set("name", name)
    .set("email",email)
    .set("password",password)
    .set("role", role)
    .toString();
    const users=await pool.query(query+ "RETURNING *")
    console.log(users)
    return users.rows[0];
    
}
module.exports={
    createUserTable,
    createUser,
    findUser
}