const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
require('./src/utils/hbsHelper');
require('./src/db/db');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.json());  
app.use(express.urlencoded());
app.use(session(
    {
        secret: 'webthaynga@123',
        resave: false,
        saveUninitialized: false
    }
));

app.use(express.static(publicDirectoryPath));
app.use(require('./src/routers/category.js'));
app.use(require('./src/routers/home.js'));
app.listen(port, () => {
    console.log('Server is up on port ' + port)
});