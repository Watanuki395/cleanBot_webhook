var config = require("./dbconfig");
const sql = require('mssql');


async function getServices(){
    try{
        let pool = await sql.connect(config);
        let services = await pool.request()
        .query("SELECT id_servicio, nombre_servicio FROM servicios_tb;");
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

async function InserClientSP(Fname,Lname,Email,telNum){
    try{
        let pool = await sql.connect(config);
        let services = await pool.request()
        .input('Fname', sql.VarChar(150), Fname)
        .input('Lname', sql.VarChar(150), Lname)
        .input('Tel', sql.VarChar(11), telNum)
        .input('Email', sql.VarChar(11), Email)
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