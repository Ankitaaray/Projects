const {pool}= require("../db/connect")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    
};
const getAllUsers=async()=>{
    const query=squel
    .select()
    .from("Users")
    .toString();
    const users=await pool.query(query);
    return users.rows;
}

const findUser=async(email)=>{
    const query=squel
    .select()
    .from("Users")
    .where("email=?", email)
    .toString();

    const user=await pool.query(query)
    return user.rows[0]
}

const createUser=async(username,email)=>{
    const query=squel
    .insert()
    .into("Users")
    .set("user_name", username)
    .set("email", email)
    .toString();
    const user=await pool.query(query+ "RETURNING *")
    return user.rows[0];
}
const deleteUsers=async(id)=>{
    const query=squel
    .delete()
    .from("Users")
    .where("id=?", id)
    .toString();

    const user= await pool.query(query+ "RETURNING *");
    return user.rows[0];
}

const updateUser=async(id,name)=>{
    const query=squel
    .update()
    .table("Users")
    .set("user_name", name)
    .where("id=?",id)
    .toString();

    const user= await pool.query(query+ "RETURNING *");
    return user.rows[0];
}

module.exports={
    createTable,
    getAllUsers,
    createUser,
    deleteUsers,
    updateUser,
    findUser
}

