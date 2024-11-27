//mongodb+srv://technpc:<db_password>@tasks.lk1ha.mongodb.net/?retryWrites=true&w=majority&appName=Tasks

const express = require("express")
const connectDB = require('./db.js')
const taskModel = require('./models/task.js')
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }));

connectDB()

app.get('/', async (req, res) => {
    const tasks = await taskModel.find()
    res.send(tasks)
})

app.listen(5000, () => {
    console.log("app is running")
})