const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// Dummy user
let user = {
    username: "afzal",
    password: ""
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
        const token = jwt.sign({ username: user.username }, SECRET_KEY, {
            expiresIn: '1h'
        });

        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).send("Token required");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send("Invalid token");
    }
};

app.get('/dashboard', verifyToken, (req, res) => {
    res.send(`Welcome ${req.user.username}`);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});