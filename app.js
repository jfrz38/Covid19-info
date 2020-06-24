//const createError = require('http-errors');
const express = require('express');
//const path = require('path');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
//const favicon = require('serve-favicon');
//cors
const cors = require('cors')
const corsOptions = {
    origin: true,
    credentials: true
}
//app
const app = express();
app.options('*', cors(corsOptions));

require('./app_api/models/db');


//const indexRouter = require('./app_server/routes/index');
//const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_api/routes/index');


  

app.use("/",apiRouter)

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', apiRouter);
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app;
