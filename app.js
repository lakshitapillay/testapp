const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const moment = require('moment');
const bodyParser = require('body-parser');

//load database
const db = require('./config/keys').MONGOURI;
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch( err => console.log(err));

//load routes
const index = require('./routes/index');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', index);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server is running...'));
