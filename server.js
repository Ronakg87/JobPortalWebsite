const app = require('./app');
require('dotenv').config();
const connectToMongo = require('./config/db');
const PORT = process.env.PORT || 5000

connectToMongo();


app.listen(PORT,()=>{console.log(`Job portal app running at ${process.env.HOSTNAME}${process.env.PORT}`);
});