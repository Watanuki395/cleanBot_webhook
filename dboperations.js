var config = require("./dbconfig");
const sql = require('mssql');


async function getServices(){
    try{
        let pool = await sql.connect(config);
        let services = await pool.request()
        .query("SELECT service_id, service_name FROM services_tb;");
        const rs = services.recordsets;
        return rs;
    }catch(error){
        console.log(error);
    }
};

module.exports =  {
    getServices : getServices
}