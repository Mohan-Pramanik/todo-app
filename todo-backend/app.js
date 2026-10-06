// Core Module
const path = require('path');

// External Module
require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
// Local Module
const DB_PATH = process.env.DB_PATH;

//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter")
const errorsController = require("./controllers/errors");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));

app.use("/api/todo", todoItemsRouter);

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3001;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
