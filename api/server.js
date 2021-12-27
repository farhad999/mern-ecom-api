const express = require('express');
const dotenv = require('dotenv')

const app = express();

dotenv.config();
app.listen(process.env.PORT||4000, () => {
    console.log('App is rounning on port 4000');
});