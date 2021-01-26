var config = require("./dbconfig");
const sql = require('mssql');


async function getServices(){
    try{
        let pool = await sql.connect(config);
        let services = await pool.request()
        .query("SELECT service_type FROM services_tb GROUP BY service_type");
        return services.recordsets;
    }catch(error){
        console.log(error);
    }
};

module.exports =  {
    getServices : getServices
}