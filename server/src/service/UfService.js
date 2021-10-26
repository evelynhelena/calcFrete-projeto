import database from "../config/configDb.js";
async function findAll(){
    const conn = await database.connect();
    const sql = "select * from UF";
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {findAll};