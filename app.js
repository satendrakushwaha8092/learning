const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json());

const route = require('./index')

// Retrieve credentials from environment variables
const dbUsername = process.env.DB_USERNAME || 'admin';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = 'mongodb'; // Use the service name defined in docker-compose.yml
const dbPort = '27017';
const dbName = 'e-commerce';

// Construct the authenticated connection string
const mongoUri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
console.log(">>>>>>>>>>>>>>>>",mongoUri)

const connectToDatabase = async () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(
        `Error While Connecting Database\n${err}\nRetry Database Connection after 5000ms\n`
      );
      setTimeout(() => {
        connectToDatabase();
      }, 5000);
    });
};

connectToDatabase()

app.use('/v1',route)

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server running ${PORT}`)
})