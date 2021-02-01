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
        const re = result[0].map(item => `servicio de: ${item.nombre_servicio}` ).join('\n');
        console.log(re);
         res.send(re);
    
        //res = re ;
    });
});

router.route('/getServicesSP').get((req,res) => {
    dbOperations.getServicesSP().then(result =>{
        const re = result[0].map(item => `- ${item.nombre_servicio}` ).join('\n');
        console.log(re);
         res.send(re);
    
        //res = re ;
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

    await dbOperations.getServicesSP().then(result =>{
        const re = result[0].map(item => `*${item.nombre_servicio}*` ).join('\n');
        console.log(re);
        //return re
        agent.add(`Actualmente brindamos servicios de limpieza de tapiceria en los siguientes articulos:\n${re}\nle gustaria cotizar un servicio?`);
        
    }).catch((err)=>{
        console.log(err);
    });    
 
    };

    async function getAppointmentHandler(agent){

        var user = agent.parameters.nombreUsuario
        agent.add(`su nombre de usuario es: ${user}`);

    };

    async function getQyesHandler(agent){

        var user = agent.parameters.nombreUsuario
        var service = agent.parameters.tipoServicio
        agent.add(`su nombre es: ${user} y le interesa un servicio de: ${service}`);

    };

    let intentMap = new Map();
    intentMap.set("holaWebHook", holaHandler);
    intentMap.set("getServices", getServicesHandler);
    intentMap.set("getAppointment", getAppointmentHandler);
    intentMap.set("getQyes", getQyesHandler);
    agent.handleRequest(intentMap);

}
