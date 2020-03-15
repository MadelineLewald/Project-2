const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const db = mongoose.connection;
const dbupdateobject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'feedmeseymour',
  	resave: false,
  	saveUninitialized: false
}));

//controllers
const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);



//home/index route
app.get('/', (req, res) => {
  res.render('home.ejs');
});

//connect to mongo
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);

//connection error/success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', process.env.DATABASE_URL));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});



app.get('/', (req, res) => {
  res.send('your application is working...');
});


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}...`);
});
mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  console.log('The connection with mongod is established')
});
