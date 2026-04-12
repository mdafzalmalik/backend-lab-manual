const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

let users = [
    { username: "admin", password: "", role: "ADMIN" },
    { username: "afzal", password: "", role: "USER" }
];

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) return res.send("User not found");

    user.password = await bcrypt.hash(password, 10);

    res.send("User registered");
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
        { username: user.username, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).send("Token required");

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(401).send("Invalid token");
    }
};

// Role-based middleware
const isAdmin = (req, res, next) => {
    if (req.user.role === "ADMIN") {
        next();
    } else {
        res.status(403).send("Access denied: Admin only");
    }
};

const isUser = (req, res, next) => {
    if (req.user.role === "USER") {
        next();
    } else {
        res.status(403).send("Access denied: User only");
    }
};

app.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.send("Welcome Admin");
});

app.get('/user', verifyToken, isUser, (req, res) => {
    res.send("Welcome User");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});