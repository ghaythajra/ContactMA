const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ContactModel = require('./Models/Contact');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


const ContactRoute = require('./Routes/contact');
app.use('/contact', ContactRoute);

mongoose.connect('mongodb://localhost:27017/merndblearning', {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function () {
  console.log('All is good, no error detected, DB Connected Successfully');
});

app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});
