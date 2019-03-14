const express = require('express'),
bodyParser = require('body-parser'),
bcrypt = require('bcrypt-nodejs'),
cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'Postgres1#',
        database : 'faceRecognition'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.send(database.users);
// })

app.get('/', (req, res) => res.send('it is working'));

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image', image.handleImage(db));
app.post('/prediction', image.handlePrediction);



app.listen(process.env.PORT || 3002, () => {
    console.log(`App is running on port ${ process.env.PORT || 3002 } \n`);
});

/*
    ---routes to endpoints and allowed request types---
    GET --> / --> 'This is working'
    POST --> /signin --> returns success/fail
    POST --> /register --> returns new user object?
    GET --> /profile/:profileId --> returns profile and has an option of returning a profile associated with a specific user?
    PUT --> /image --> update user rank? 
*/


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });