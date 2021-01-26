const express = require('express') ;
const bodyParser = require('body-parser');
const cors = require('cors')
const sql = require('mssql');
require('dotenv').config() 
const config = require('./dbconfig');
var dbOperations = require('./dboperations');
const { response } = require('express');
const {WebhookClient} = require('dialogflow-fulfillment');

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
        //console.log(result);
        res.json(result[0]);
    });
});

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
});

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

    function holaHandler(agent){
        agent.add("Hello, this was a nice tutorial by axlewebtech")
    }

    let intentMap = new Map();
    intentMap.set("holaWebHook", holaHandler);
    agent.handleRequest(intentMap);

}
