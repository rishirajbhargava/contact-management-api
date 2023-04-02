const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const contact = require("./routes/contact");
const userRoutes= require("./routes/userRoutes");
const connectDb = require('./config/database');


const app = express();

connectDb();


const port = process.env.PORT || 5000


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api/contacts',contact);
app.use('/api/users',userRoutes);
app.use(errorHandler);



app.listen(port, () => console.log(`Server running, listening on port ${port}!`))