const {pool}= require("../db/connectpg")
const sqlite3=require('sqlite3').verbose()
const db= new sqlite3.Database("./tasks2.db")

const createTable=()=>{
     db.run(`
        CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        completed BOOLEAN DEFAULT false
        );
    `)
};

const get_all_task=()=>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM tasks",[],(err,rows)=>{
            if(err) reject(err)
                else resolve(rows)
        });
    });
};

const create_task=(name, completed)=>{
    if (completed===undefined){
        completed=false;
    }
    return new Promise((resolve,reject)=>{
        db.get("INSERT INTO tasks (name,completed) VALUES (?, ?) RETURNING *",[name, completed], (err,row)=>{
            if(err) reject(err)
                else resolve(row)
        });
    })
    
}

// const create_task=async(name, completed)=>{
//     if (completed===undefined){
//         completed=false;
//     }
//     const task=await pool.query(
//         "INSERT INTO tasks (name,completed) VALUES ($1, $2) RETURNING *",[name, completed]
//     );
//     return task.rows[0];
// }
// const delete_task= async(id)=>{
//     const task=await pool.query(
//         "DELETE FROM tasks WHERE id= $1 RETURNING *",[id]
//     );
//     console.log(task);
//     return task.rows[0];
// }

const delete_task= (id)=>{
    return new Promise((resolve,reject)=>{
        db.get("DELETE FROM tasks WHERE id= ? RETURNING *",[id], (err,row)=>{
            if(err) reject(err)
                else resolve(row)
        });
    })
}

const get_task=(id)=>{
    return new Promise((resolve, reject)=>{
        db.get("SELECT * FROM tasks WHERE id= ?",[id], (err,rows)=>{
            if(err) reject(err)
            else resolve(rows)
        });
    });
}

// const get_task=async(id)=>{
//     const task=await pool.query(
//         "SELECT * FROM tasks WHERE id= $1",[id]
//     );
//     return task.rows[0];
// }

const update_task= (id,name,completed)=>{
    return new Promise((resolve,reject)=>{
        db.get("UPDATE tasks SET name= ?, completed=? WHERE id=? RETURNING *",[name,completed,id], (err,row)=>{
            if(err) reject(err)
            else resolve(row)
        });
    });
}

// const update_task= async(id,name,completed)=>{
//     const task=await pool.query(
//         "UPDATE tasks SET name= $1, completed=$2 WHERE id=$3 RETURNING *",[name,completed,id]
//     );
//     return task.rows[0];
// }



module.exports={
    createTable,
    get_all_task,
    create_task,
    delete_task,
    get_task,
    update_task
}
