require("dotenv").config();

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json());

const route = require('./index')

const connectToDatabase = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
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