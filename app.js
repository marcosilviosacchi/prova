const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const FileStore = require('session-file-store')(session);

const privateKey  = fs.readFileSync('./cert/PC313045.key');
const certificate = fs.readFileSync('./cert/PC313045.cer');
const credentials = { key: privateKey, cert: certificate };

const app = express();

/* app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); */

const corsOption = {
    origin: 'http://localhost:8080',
    credentials: true
}
app.use(cors(corsOption));

app.use(
    session({
        store: new FileStore(),
        secret: 'EUsM4VkkNK',
        saveUninitialized: true,
        resave: true
    })
);
app.use(bodyParser.json());

app.get('/api/v1/',(req,res,next) => {
    res.send('IT WORKS!')
})
let auth = function(req,res,next){
    if(req.session.true){
        return next();
    }else{
        res.send('Prima ti devi loggare');
    }
}
//carico ORM
const db = require('./config/db.config');
db.sequelize
  .sync({ force: false }) // force: true will drop the table if it already exists
  .then(function(err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });


//Carico delle Rotte con utilizzo di router
app.use('/api/v1/auth',require('./routes/auth'));
//app.use('/api/v1/risorsa',auth,require('./routes/risorsa'));
app.use('/api/v1/fields',require('./routes/fields'));
app.use('/api/v1/dbAccess',require('./routes/dbAccess'));

var server = https.createServer(credentials,app).listen(1337);
//app.listen(80);