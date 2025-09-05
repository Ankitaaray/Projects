const {pool}= require("../db/connect")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Messages(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        user_name VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        receiver_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES Users(id) ON DELETE CASCADE
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

const saveMessage=async(user_id, user_name, message, receiver_id)=>{
    const query=squel
    .insert()
    .into("Messages")
    .set("user_id", user_id)
    .set("user_name", user_name)
    .set("message", message)
    .set("receiver_id",receiver_id)
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

const getUserMessages=async(user_id,receiver_id)=>{
    const query=squel
    .select()
    .from("Messages")
    .where("(user_id=? AND receiver_id=?) OR (user_id=? AND receiver_id=?)",user_id,receiver_id,receiver_id,user_id)
    .toString();
    const messages=await pool.query(query);
    return messages.rows;
}


module.exports={
    createTable,
    saveMessage,
    deleteMessage,
    getAllMessages,
    getUserMessages
}