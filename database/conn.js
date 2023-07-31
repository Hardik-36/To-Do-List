const { MongoMemoryServer } = require("mongodb-memory-server");
// conn.js

const mongoose = require('mongoose');

// Replace <username>, <password>, and <cluster_name> with your actual MongoDB Atlas credentials
const dbURI = 'mongodb+srv://admin:Kashish-16@cluster0.glfukk7.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = connectDB;
