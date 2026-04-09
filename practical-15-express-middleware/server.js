const express = require('express');
const app = express();

// Middleware 1: Logger
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Middleware 2: Simple authentication
const auth = (req, res, next) => {
    const isLoggedIn = true;

    if (isLoggedIn) {
        next();
    } else {
        res.send("Unauthorized Access");
    }
};

app.use(logger);

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/dashboard', auth, (req, res) => {
    res.send("Welcome to Dashboard");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});