const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

let user = {
    username: "afzal",
    password: "12345"
};

app.post('/signup', async (req, res) => {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    res.send("User registered successfully");
});

app.post('/login', async (req, res) => {
    const { password } = req.body;

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        req.session.user = user;
        res.send("Login successful");
    } else {
        res.send("Invalid credentials");
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send("Welcome to Dashboard");
    } else {
        res.status(401).send("Please login first");
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged out successfully");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});