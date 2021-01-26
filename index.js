const express = require('express') ;
const bodyParser = require('body-parser');
const cors = require('cors')
const sql = require('mssql');
require('dotenv').config() 
const config = require('./dbconfig');
var dbOperations = require('./dboperations');
const { response } = require('express');

const app = express(); 
var router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) ;
app.use(cors());
app.use('/api',router);
//app.get('/', (req, res) => { res.status(200).send('Server is working.') }); 
app.listen(port, () => { console.log(`🌏 Server is running at http://localhost:${port}`) });

router.route('/getServices').get((req,res) => {
    dbOperations.getServices().then(result =>{
        //console.log(result);
        res.json(result[0]);
    });
});

//app.get('/getServices', (req,res) =>{ 
//
//    var myres = {};
//    sql.connect(config).then(pool =>{
//            return pool.request()
//              .query('select * from services_tb');
//      }).then(result => {
//          console.log(JSON.stringify(result));
//          myres = JSON.stringify(result);
//      }).catch(err => {
//            console.log(err);
//      });
//      res.send(myres);
//});
