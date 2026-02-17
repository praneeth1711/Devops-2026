const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

let users = [];
let loggedInUsers = new Set();

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function authMiddleware(req, res, next) {
    const username = req.headers['username'];

    if (!username || !loggedInUsers.has(username)) {
        return res.status(401).json({ error: "Unauthorized. Please login first." });
    }

    next();
}

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = hashPassword(password);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const user = users.find(u => u.username === username);
    if (!user || user.password !== hashPassword(password)) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    loggedInUsers.add(username);
    res.status(200).json({ message: "Login successful" });
});

app.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: "Welcome to the dashboard! You are authenticated." });
});

app.listen(3000, () => {
    console.log("Authentication server running on port 3000");
});
