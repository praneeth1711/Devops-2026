const express = require("express");

const app = express();
const PORT = 3000;

// Middleware (Important for POST JSON data)
app.use(express.json());

// Temporary in-memory data
let users = [
  { id: 1, name: "Spandana" },
  { id: 2, name: "Rahul" }
];


// ================= GET =================
// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});


// ================= POST =================
// Add new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);
  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});


// ================= DELETE =================
// Delete user by ID
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(user => user.id !== id);

  res.json({
    message: "User deleted successfully"
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});