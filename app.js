const express = require('express');
const app = express();

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Route to show form (HTML + CSS + JS)
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Single File Express App</title>
            <style>
                body {
                    font-family: Arial;
                    background: #f2f2f2;
                    padding: 40px;
                }
                form {
                    background: white;
                    padding: 20px;
                    width: 300px;
                }
                input, button {
                    width: 100%;
                    padding: 8px;
                    margin: 5px 0;
                }
                button {
                    background: blue;
                    color: white;
                    border: none;
                }
            </style>
        </head>
        <body>

            <h2>User Form</h2>

            <form method="POST" action="/submit">
                <input type="text" name="name" placeholder="Enter name" required>
                <input type="email" name="email" placeholder="Enter email" required>
                <button type="submit">Submit</button>
            </form>

            <script>
                console.log("JS is running inside the same file!");
            </script>

        </body>
        </html>
    `);
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    res.send(`
        <h2>Form Submitted ✅</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <a href="/">Go Back</a>
    `);
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});