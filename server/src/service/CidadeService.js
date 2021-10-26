import database from "../config/configDb.js";

async function insetCity(nomeCity,tipoCity,idUF){
    const conn = await database.connect();
    const sql = `INSERT INTO CIDADE(NOME_CIDADE,TIPO_CIDADE,FK_ID_UF)VALUES(?,?,?)`;
    const newCity = [nomeCity,tipoCity,idUF];
    conn.query(sql,newCity);
    conn.end();
}

async function findByID(id){
    const conn = await database.connect();
    const sql = "select * from cidade c where c.ID = ? and c.ind_canc = 0";
    const [rows] = await conn.query(sql,id);
    conn.end();
    return rows;
}

async function findByName(name){
    const conn = await database.connect();
    const sql = `select * from cidade c where c.NOME_CIDADE like("%${name}%") and c.ind_canc = 0`
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function updateCity(nomeCity,tipoCity,idUF,idCity){
    const conn = await database.connect();
    const sql = "update cidade c set NOME_CIDADE = ?, TIPO_CIDADE = ?, FK_ID_UF = ? where c.ID = ? ";
    const dataCity = [nomeCity,tipoCity,idUF,idCity];
    conn.query(sql,dataCity);
    conn.end();
}

async function deleteCity(idCity){
    const conn = await database.connect();
    const sql = "update cidade c set ind_canc = 1 where c.ID = ?";
    conn.query(sql,idCity);
    conn.end();
}

export default {findByID,findByName,insetCity,updateCity,deleteCity};