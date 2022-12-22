const path = require('path');
const express = require('express');
const cors = require('cors');

require('./src/db/db');

const app = express();

app.use(cors())
app.use(express.json());

app.use(require('./src/routers/category.js'));
const port = process.env.PORT | 4000;
app.listen(port, () => {
    console.log('Server is up on port ' + port)
});