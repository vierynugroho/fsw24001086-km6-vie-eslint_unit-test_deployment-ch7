const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');
const { MORGAN_FORMAT } = require('../config/application');
const app = express();

require('dotenv/config');
app.use(morgan(MORGAN_FORMAT));
app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;
