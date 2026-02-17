const express = require('express');
const app = express();

const students = [
    { id: 1, name: "Praneeth", age: 20, course: "CSE" },
    { id: 2, name: "Rahul", age: 21, course: "ECE" },
    { id: 3, name: "Anjali", age: 19, course: "IT" }
];

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Student Information Management System" });
});

app.get('/students', (req, res) => {
    res.json({ students: students });
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ error: "Invalid student ID" });
    }

    res.json({ student: student });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
