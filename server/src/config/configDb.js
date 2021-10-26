import mysql from 'mysql2/promise';

async function connect(){
    //console.log(process.env.MYSQL_HOST);
    const datainfo = {
        host : 'localhost',
        user :'root',
        password :'',
        database :'projetofrete'
    };

    const connction = await mysql.createConnection(datainfo);

    return connction;
}

export default {connect};