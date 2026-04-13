require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

const userSchema = new mongoose.Schema({
    name: String
});

const User = mongoose.model('User', userSchema);

app.post('/add', async (req, res) => {
    const user = new User({ name: req.body.name });
    await user.save();
    res.send("User added");
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.put('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { name: req.body.name });
    res.send("User updated");
});

app.delete('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});