var config = require("./dbconfig");
const sql = require('mssql');


async function getServices(){
    try{
        let pool = await sql.connect(config);
        let services = await pool.request()
        .query("SELECT id_servicio, nombre_servicio FROM services_tb;");
        const rs = services.recordsets;
        return rs;
    }catch(error){
        console.log(error);
    }
};

async function getServicesSP(){
    try{
        let pool = await sql.connect(config);
        let services = await pool.request()
        .execute('sp_getServices');
        const rs = services.recordsets;
        return rs;
    }catch(error){
        console.log(error);
    }
};

async function InserClientSP(Fname,Lname,Email){
    try{
        let pool = await sql.connect(config);
        let services = await pool.request()
        .input('nombreC', sql.VarChar(200), Fname)
        .input('apellidoC', sql.VarChar(100), Lname)
        .input('emailC', sql.VarChar(100), Email)
        .execute('sp_InsertClient');
        const rs = services.recordsets;
        return rs;
    }catch(error){
        console.log(error);
    }
};

module.exports =  {
    getServices : getServices, getServicesSP : getServicesSP, InserClientSP : InserClientSP
}