const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const indexRoute = require('./routes/index')
const cors = require('cors')
const path = require('path')

const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000'
}))

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

//server static file

//const uplaods = require('./uploads');

const dir = path.join(__dirname, './uploads');

app.use('/uploads', express.static(dir));

//using route

app.use('/api/v1/', indexRoute);

app.listen(process.env.PORT||4000, () => {
    console.log('App is rounning on port 4000');
});
