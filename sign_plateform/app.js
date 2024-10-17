/*Les importations */
//var https = require('https');
var cron = require('node-cron');
var session = require('express-session')
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
const MongoStore = require('connect-mongo');
const Port = require('./settings/default').Port
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const server = http.createServer(app)

const io = require('socket.io')(server);
const test= require('./routes/test');

const doc= require('./routes/document');
const user= require('./routes/user');
const role= require('./routes/role');
// const apiv1= require('./routes/api');
const bodyparser = require("body-parser");
const { Swagger_title, Swagger_description, Swagger_api_version } = require('./settings/default');
const { check_role } = require('./program/program');




/*formatage*/

/*formatage*/

/* Les routes */

app.use(express.static(path.join(__dirname, 'publics')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.static(path.join(__dirname, 'generate')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});
//DOC API
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title:Swagger_title,
            description: Swagger_description,
            version: Swagger_api_version,
        },
        
        favicon: 'https://skyvisionafrica.com/public/assets/logo/sky.png'
    },
    // Spécifiez les chemins de vos fichiers contenant les commentaires JSDoc
    apis: ['./routes/*.js'], // Chemin vers vos fichiers de routes Express
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//DOC API
app.use('/api/v1/token', test.router);

app.use('/api/v1/doc', doc.router);

app.use('/api/v1/user', user.router);

app.use('/api/v1/role', role.router);
// app.use('/api/v1', apiv1.router);

server.listen(Port, () => {

    check_role()
/*
 cron.schedule('0 * * * * *', async () => { //chaque 10 min
       
     });
*/
    
    console.log("Server loaded on port  : "+ Port)
});




module.exports = io;