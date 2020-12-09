// import dependencies and initialize express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


// import routes 
const apiRoutes = require('./routes/api-routes');
const userRoutes = require('./routes/user-routes');
const healthRoutes = require('./routes/health-route');
const swaggerRoutes = require('./routes/swagger-route');


require('dotenv').config()

const app = express();


// enable parsing of http request body
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routes and api calls
app.use('/api', apiRoutes);
app.use('/users', userRoutes);
app.use('/health', healthRoutes);
app.use('/swagger', swaggerRoutes);





/* // default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});
 */


// serve client UI
// default path to serve up index.html (single page application)
app.get('*', (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});



// start node server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});



// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
