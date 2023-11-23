require('dotenv').config()

const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const app = express();
const port = 1337;

// Routes
const userRoute = require('./routes/user');

//Middleware
app.use(cors())
// app.use(options('*', cors()));
app.disable('x-powered-by');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/user", userRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});