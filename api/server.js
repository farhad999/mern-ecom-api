const express = require('express');
const dotenv = require('dotenv')

const app = express();

dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then(()=> {
    console.log("mongo db connected");
}).catch((er)=> {
    console.log('Error in connection', er);
})
app.listen(process.env.PORT||4000, () => {
    console.log('App is rounning on port 4000');
});