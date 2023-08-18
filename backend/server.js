const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const fileUpload = require('./routes/fileUpload')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/fileupload')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/upload',fileUpload)

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));