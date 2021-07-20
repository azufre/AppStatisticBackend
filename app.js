//initial env 
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//setting up server express
const app = express();

//setting up CORS
app.use(cors());

//read and parse json
app.use(express.json());

//starting db
dbConnection();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Statistic',
      version: '1.0.0',
      description:'API Statistic information'
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/auth', require('./routes/auth.routes'));
app.use('/statistic', require('./routes/statistic.routes'));
app.use('/sync', require('./routes/sync.routes'));

var server = app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});

module.exports = server;
