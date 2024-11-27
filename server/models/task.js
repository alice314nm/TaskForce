const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean,
    category: String
})

const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel