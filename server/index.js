const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const usersRoutes = require('./routes/usersRoutes'); // corrected path

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// Allow cross-domain requests
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(express.json());

const url = "mongodb://0.0.0.0:27017/users";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
       useUnifiedTopology: true
 
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

connectDB();

// use the userRoutes file 
app.use('/',usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});