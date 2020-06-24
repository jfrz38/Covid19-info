const express = require('express');
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
