const express = require('express');
const validator = require('validator');

const app = express();
app.use(express.json());

const sanitizeInput = (req, res, next) => {
    if (req.body.name) {
        req.body.name = validator.escape(req.body.name);
    }
    next();
};

const validateInput = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).send("Invalid input");
    }

    next();
};

app.post('/submit', sanitizeInput, validateInput, (req, res) => {
    res.send(`Safe data received: ${req.body.name}`);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});