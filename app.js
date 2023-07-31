const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer'); // Import multer for handling multipart/form-data
const app = express();
const connect = require('./database/conn');
const router = require('./router/route');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

// Create a multer instance to handle multipart/form-data
const upload = multer();

app.get('/', (req, res) => {
  res.status(201).json("home get request");
});

// Use multer.none() middleware to handle multipart/form-data
app.use('/api', upload.none(), router);

connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`All the best server is connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.log("can not connect server");
  }
}).catch(error => {
  console.log("invalid database connection");
});
