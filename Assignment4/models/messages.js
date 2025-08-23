const {pool}= require("../db/connectpg")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Messages(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    
};

const getAllMessages=async()=>{
    const query=squel
    .select()
    .from("Messages")
    .toString();
    const messages=await pool.query(query);
    return messages.rows;
}

const saveMessage=async(user_id, message)=>{
    const query=squel
    .insert()
    .into("Messages")
    .set("user_id", user_id)
    .set("message", message)
    .toString();
    const messages=await pool.query(query+ "RETURNING *")
    return messages.rows[0];
}

const deleteMessage=async(id)=>{
    const query=squel
    .delete()
    .from("Messages")
    .where("id=?", id)
    .toString();

    const user= await pool.query(query+ "RETURNING *");
    return user.rows[0];
}
module.exports={
    createTable,
    saveMessage,
    deleteMessage,
    getAllMessages
}