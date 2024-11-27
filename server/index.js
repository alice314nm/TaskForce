// server/index.js

const express = require('express');
const connectDB = require('./db.js');
const taskModel = require('./models/task.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

connectDB();

app.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});