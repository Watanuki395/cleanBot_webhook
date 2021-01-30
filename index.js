const express = require('express') ;
const bodyParser = require('body-parser');
const cors = require('cors')
const sql = require('mssql');
require('dotenv').config() 
const config = require('./dbconfig');
var dbOperations = require('./dboperations');
const { response } = require('express');
const {WebhookClient} = require('dialogflow-fulfillment');
const { json } = require('body-parser');
const { values } = require('actions-on-google/dist/common');

const app = express(); 
var router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) ;
app.use(cors());
app.use('/',router);
//app.get('/', (req, res) => { res.status(200).send('Server is working.') }); 
app.listen(port, () => { console.log(`🌏 Server is running at http://localhost:${port}`) });

router.route('/getServices').get((req,res) => {
    dbOperations.getServices().then(result =>{
        const re = result[0].map(item => `servicio de: ${item.service_type}` ).join('\n');
        console.log(re);
        //return re
        
        res = re ;
    });
});

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response);
    //headers:{"Conten-Type": "aplication/json"}
});

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})
    
    function holaHandler(agent){
        agent.add("Hello, this was a nice tutorial by axlewebtech")
    };

   async function getServicesHandler(agent){

    await dbOperations.getServices().then(result =>{
        const re = result[0].map(item => `*${item.service_name}*` ).join('\n');
        console.log(re);
        //return re
        agent.add(`Actualmente brindamos servicios de limpieza de tapiceria en los siguientes articulos:
        \n${re}\n si esta interesado en algun servicio por favor escriba el nombre del servicio para 
        obtener los detalles o escriba *2* para ver una lista de precios en general.`);
        
    }).catch((err)=>{
        console.log(err);
    });    
 
    };

    let intentMap = new Map();
    intentMap.set("holaWebHook", holaHandler);
    intentMap.set("getServices", getServicesHandler);
    agent.handleRequest(intentMap);

}
