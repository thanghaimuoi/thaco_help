require('dotenv').config()
const path = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
var cookieParser = require('cookie-parser');

require('./src/db/db');

const app = express();


app.set('trust proxy', 1);
app.use(session({
  secret: 'ThacoHelp@1234',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/uploads/", express.static(path.join(__dirname, "./public/uploads")));
app.use(require('./src/middleware/auth'));

app.use(require('./src/routers/category.js'));
app.use(require('./src/routers/login.js'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const port = process.env.PORT | 4000;
app.listen(port, () => {
    console.log('Server is up on port ' + port)
});