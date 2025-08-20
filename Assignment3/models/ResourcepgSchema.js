const {pool}= require("../db/connectpg")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Resources(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50)NOT NULL
        );
    `)
    
};
const get_all_resources=async()=>{
    const query=squel
    .select()
    .from("Resources")
    .toString();
    const resources=await pool.query(query);
    return resources.rows;
}

const get_resource=async(id)=>{
    const query=squel
    .select()
    .from("Resources")
    .where("id=?", id)
    .toString();

    const resources=await pool.query(query);
    return resources.rows;
}

const create_resource=async(name)=>{
    const query=squel
    .insert()
    .into("Resources")
    .set("name", name)
    .toString();
    const resources=await pool.query(query+ "RETURNING *")
    return resources.rows[0];
}
const delete_resource=async(id)=>{
    const query=squel
    .delete()
    .from("Resources")
    .where("id=?", id)
    .toString();

    const resources= await pool.query(query+ "RETURNING *");
    return resources.rows[0];
}

const update_resource=async(id,name)=>{
    const query=squel
    .update()
    .table("resources")
    .set("name", name)
    .where("id=?",id)
    .toString();

    const resources= await pool.query(query+ "RETURNING *");
    return resources.rows[0];
}

module.exports={
    createTable,
    get_resource,
    create_resource,
    update_resource,
    delete_resource,
    get_all_resources
}

