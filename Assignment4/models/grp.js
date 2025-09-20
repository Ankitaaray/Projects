const { json } = require("express");
const {pool}= require("../db/connect")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Groups(
        id SERIAL PRIMARY KEY,
        group_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    
};

const createGroupTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Members(
        grp_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    
};

const createGroup=async(grp_name)=>{
    const query=squel
    .insert()
    .into("Groups")
    .set("group_name", grp_name)
    .toString();
    const group=await pool.query(query+ "RETURNING *")
    return group.rows[0];
}

const addMembers=async(grp_id,user_id)=>{
    const query=squel
    .insert()
    .into("Members")
    .set("grp_id", grp_id)
    .set("user_id",user_id)
    .toString();
    const group=await pool.query(query+ "RETURNING *")
    return group.rows[0];
}

const findUserFromGrp=async(id)=>{
    const query=squel
    .select()
    .from("Groups")
    .where("id=?", id)
    .toString();

    const group=await pool.query(query)
    return group.rows[0]
}

const getUserAllGroups=async(id)=>{
    const jsonId=JSON.stringify([id]);
    const query=squel
    .select()
    .from("Groups")
    .where("userIds @> ?",JSON.stringify([id]))
    .toParam();

    console.log(query);

    const group=await pool.query(query.text, query.values)
    return group.rows;
}



module.exports={
    createTable,
    createGroup,
    findUserFromGrp,
    getUserAllGroups,
    addMembers
}
