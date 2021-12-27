const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const indexRoute = require('./routes/index')

const app = express();

dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then(()=> {
    console.log("mongo db connected");
}).catch((er)=> {
    console.log('Error in connection', er);
})

app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

//using route

app.use('/api/v1/', indexRoute);

app.listen(process.env.PORT||4000, () => {
    console.log('App is rounning on port 4000');
});