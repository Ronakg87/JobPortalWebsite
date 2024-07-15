const express = require('express');
const app = express();

const user_routes = require("./routes/userRoutes");
const category_routes = require("./routes/catRoutes");
const job_routes = require("./routes/jobRoutes");
const terms_routes = require("./routes/termsRoutes");

app.use('/api',user_routes);
app.use('/api',category_routes);
app.use('/api',job_routes);
app.use('/api',terms_routes);

module.exports = app;


