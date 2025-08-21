const initSqlJs = require("sql.js");
const fs = require("fs");

let db;


(async () => {
  const SQL = await initSqlJs();

  try {
    
    const fileBuffer = fs.readFileSync("./tasks2.db");
    db = new SQL.Database(fileBuffer);
  } catch (err) {
    
    db = new SQL.Database();
    createTable();
  }
})();

function createTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50),
      completed BOOLEAN DEFAULT false
    );
  `);
  saveDB();
}

function delete_task(id) {
  try {
    const result = db.exec("SELECT * FROM tasks WHERE id = ?", [id]);
    if (result.length === 0) return null; // nothing found

    db.run("DELETE FROM tasks WHERE id = ?", [id]);
    saveDB();

    return result[0].values[0];
  } catch (err) {
    throw err;
  }
}

function get_task(id) {
  try {
    const result = db.exec("SELECT * FROM tasks WHERE id = ?", [id]);
    if (result.length === 0) return null;
    return result[0].values[0]; 
  } catch (err) {
    throw err;
  }
}

function update_task(id, name, completed) {
  try {
    db.run("UPDATE tasks SET name = ?, completed = ? WHERE id = ?", [
      name,
      completed,
      id,
    ]);
    saveDB();

    const result = db.exec("SELECT * FROM tasks WHERE id = ?", [id]);
    if (result.length === 0) return null;
    return result[0].values[0];
  } catch (err) {
    throw err;
  }
}

function get_all_task() {
  try {
    const result = db.exec("SELECT * FROM tasks");
    if (result.length === 0) return [];
    return result[0].values; 
  } catch (err) {
    throw err;
  }
}


function create_task(name, completed = false) {
  try {
    db.run("INSERT INTO tasks (name, completed) VALUES (?, ?)", [name, completed]);
    saveDB();


    const result = db.exec("SELECT * FROM tasks ORDER BY id DESC LIMIT 1");
    return result[0].values[0];
  } catch (err) {
    throw err;
  }
}

function saveDB() {
  const data = db.export();
  fs.writeFileSync("tasks2.db", Buffer.from(data));
}

module.exports = { 
    createTable, 
    get_all_task, 
    create_task,
    delete_task,
    update_task,
    get_task 
}