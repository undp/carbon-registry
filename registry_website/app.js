/*Les importations */
//var https = require('https');
var cron = require('node-cron');
var session = require('express-session')
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
const MongoStore = require('connect-mongo');
const _default = require('./setting/default');
app.use(session({
    secret: 'flex session',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000000 },
    name: "model1",
    store:MongoStore.create((_default.conf_bdd.auth)? {mongoUrl: `mongodb://${_default.conf_bdd.user}:${_default.conf_bdd.pass}@127.0.0.1:27017/session_landing` }: {mongoUrl: 'mongodb://127.0.0.1:27017/session_landing' })
}))


//const fs = require('mz/fs');



//const server = https.createServer(options, app);
//const server = https.createServer({key, cert}, app).listen(443)
const server = http.createServer(app)
const io = require('socket.io').listen(server);

const global= require('./routes/global');
const api = require('./routes/api');
const api_central = require('./routes/api_central');
const bodyparser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const admin = require('./routes/admin');
const work = require('./routes/workflow.js');
const eligi = require('./routes/eligi.js');
const ministry = require('./routes/ministry.js');
const surv = require('./routes/surv.js')
/*Les importations */

/*formatage*/
app.use(expressLayouts)



app.set('view engine', 'ejs');

/*formatage*/

/* Les routes */
app.use(express.static(path.join(__dirname, 'publics')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'tempfiles')));
app.use('/views', express.static("views"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', global.router);
app.use('/api',api.router)
app.use('/api_central',api_central.router)
app.use('/myregister',admin.router)
app.use('/myregister/doc', ministry.router)
app.use('/myregister/surv', surv.router)
app.use('/work',work.router)
app.use('/eligi',eligi.router)

server.listen(_default.port, () => {

    
    console.log("Serveur lancé avec success port : "+ _default.port)
});




module.exports = io;