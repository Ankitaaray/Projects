const {pool}= require("../db/connectpg")
const squel=require('squel')
const createTable=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Reservation(
        ReservationId SERIAL PRIMARY KEY,
        ResourceId INT,
        UserId INT,
        startTime TIMESTAMP NOT NULL,
        endTime TIMESTAMP NOT NULL
        );
    `)
};

const get_all_reservations=async()=>{
    const query=squel
    .select()
    .from("Reservation")
    .toString();

    const reservations=await pool.query(query);
    return reservations.rows;
}

const delete_reservation_by_user=async(id, user)=>{
    const query=squel
    .delete()
    .from("Reservation")
    .where("ResourceId=?",id)
    .where("UserId=?", user)
    .toString();

    const reservations= await pool.query(query+ "RETURNING *");
    return reservations.rows[0];
}

const delete_reservation=async(id)=>{
    const query=squel
    .delete()
    .from("Reservation")
    .where("ReservationId=?",id)
    .toString();

    const reservations= await pool.query(query+ "RETURNING *");
    return reservations.rows[0];
}
const get_reservation_by_user=async(uid)=>{
    const query=squel
    .select()
    .from("Reservation")
    .where("UserId=?", uid)
    .toString();

    const reservations=await pool.query(query);
    return reservations.rows;
}


const get_reservation=async(id)=>{
    const query=squel
    .select()
    .from("Reservation")
    .where("ResourceId=?", id)
    .toString();

    const reservations=await pool.query(query);
    return reservations.rows;
}

const create_reservation=async(ResourceId, UserId, startTime, endTime)=>{
    const query=squel
    .insert()
    .into("Reservation")
    .set("ResourceId", ResourceId)
    .set("UserId",UserId)
    .set("startTime", startTime)
    .set("endTime", endTime)
    .toString();

    const reservations=await pool.query(query+ "RETURNING *")
    return reservations.rows[0];
}

module.exports={
    createTable,
    create_reservation,
    delete_reservation,
    get_all_reservations,
    get_reservation,
    get_reservation_by_user,
    delete_reservation_by_user
}
 
