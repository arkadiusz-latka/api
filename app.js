const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const CompaniesRouter = require('./routes/CompaniesRouter');
const WorkersRouter = require('./routes/WorkersRouter');
const AuthRouter = require('./routes/AuthRouter');

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/workers', WorkersRouter);
app.use('/companies', CompaniesRouter);

module.exports = {app};
