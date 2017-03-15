const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const jsonParser = bodyParser.json();

const app = express();

app.listen(process.env.PORT || 8080, function () {
    console.log(`you're listening on ${process.env.PORT || 8080}`);
});
