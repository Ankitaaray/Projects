const {pool}= require("../db/connectpg")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Reservation1(
        reservation_id SERIAL PRIMARY KEY,
        resource_id INT,
        user_id INT,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
};

const getAllReservations =async()=>{
    const query=squel
    .select()
    .from("Reservation1")
    .toString();

    const reservations=await pool.query(query);
    return reservations.rows;
}

const deleteReservationByUser=async(id, user)=>{
    const query=squel
    .delete()
    .from("Reservation1")
    .where("resource_id=?",id)
    .where("user_id=?", user)
    .toString();

    const reservations= await pool.query(query+ "RETURNING *");
    return reservations.rows[0];
}

const deleteReservation=async(id)=>{
    const query=squel
    .delete()
    .from("Reservation1")
    .where("reservation_id=?",id)
    .toString();

    const reservations= await pool.query(query+ "RETURNING *");
    return reservations.rows[0];
}
const getReservationByUser=async(uid)=>{
    const query=squel
    .select()
    .from("Reservation1")
    .where("user_id=?", uid)
    .toString();

    const reservations=await pool.query(query);
    return reservations.rows;
}


const getReservation=async(id)=>{
    const query=squel
    .select()
    .from("Reservation1")
    .where("resource_id=?", id)
    .toString();

    const reservations=await pool.query(query);
    return reservations.rows;
}

const createReservation=async(ResourceId, UserId, startTime, endTime)=>{
    const query=squel
    .insert()
    .into("Reservation1")
    .set("ResourceId", ResourceId)
    .set("user_id",UserId)
    .set("start_time", startTime)
    .set("end_time", endTime)
    .toString();

    const reservations=await pool.query(query+ "RETURNING *")
    return reservations.rows[0];
}

module.exports={
    createTable,
    createReservation,
    deleteReservation,
    getAllReservations,
    getReservationByUser,
    deleteReservationByUser,
    getReservation
}
 
