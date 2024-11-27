const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(
            'mongodb+srv://technpc:3QTcjq0OLq2BRRKb@tasks.lk1ha.mongodb.net/task-force?retryWrites=true&w=majority&appName=Tasks',
            {
            useNewUrlParser: true,
            useUnifiedTopology: true
            });
        console.log(`MongoDb Connected: ${conn.connection.host}`)

    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;