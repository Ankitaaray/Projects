const {pool}= require("../db/connectpg")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Resources1(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50)NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    
};
const getAllResources=async()=>{
    const query=squel
    .select()
    .from("Resources1")
    .toString();
    const resources=await pool.query(query);
    return resources.rows;
}

const getResource=async(id)=>{
    const query=squel
    .select()
    .from("Resources1")
    .where("id=?", id)
    .toString();

    const resources=await pool.query(query);
    return resources.rows;
}

const createResource=async(name)=>{
    const query=squel
    .insert()
    .into("Resources1")
    .set("name", name)
    .toString();
    const resources=await pool.query(query+ "RETURNING *")
    return resources.rows[0];
}
const deleteResource=async(id)=>{
    const query=squel
    .delete()
    .from("Resources1")
    .where("id=?", id)
    .toString();

    const resources= await pool.query(query+ "RETURNING *");
    return resources.rows[0];
}

const updateResource=async(id,name)=>{
    const query=squel
    .update()
    .table("resources1")
    .set("name", name)
    .where("id=?",id)
    .toString();

    const resources= await pool.query(query+ "RETURNING *");
    return resources.rows[0];
}

module.exports={
    createTable,
    getResource,
    createResource,
    updateResource,
    deleteResource,
    getAllResources
}

