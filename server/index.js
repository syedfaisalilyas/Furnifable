const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

const PORT = 3000;

const app = express();
const DB = 'mongodb+srv://faisalilyas2005:faysal%40%40123@cluster0.tqian.mongodb.net/mydatabase?retryWrites=true&w=majority';

app.use(express.json());
app.use(authRouter);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});

app.listen(PORT, "0.0.0.0", function () {
    console.log('The server is listening on the port successfully');
});