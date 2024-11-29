// server/index.js

const express = require('express');
const connectDB = require('./db.js');
const taskModel = require('./models/task.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

connectDB();

// Get all Tasks
app.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create a new task
app.post('/', async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete Tasks
app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Edit the complete
app.patch('/:id/completed', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});