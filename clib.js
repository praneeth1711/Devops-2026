const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: "Node Basics", author: "John", price: 500 },
    { id: 2, title: "Express Guide", author: "Smith", price: 650 }
];

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.post('/books', (req, res) => {
    const { title, author, price } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({ error: "All fields (title, author, price) are required" });
    }

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        price
    };

    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, price } = req.body;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    if (!title || !author || !price) {
        return res.status(400).json({ error: "All fields (title, author, price) are required" });
    }

    book.title = title;
    book.author = author;
    book.price = price;

    res.status(200).json({ message: "Book updated successfully", book });
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);
    res.status(200).json({ message: "Book deleted successfully", book: deletedBook[0] });
});

app.listen(3000, () => {
    console.log("Online Bookstore API running on port 3000");
});
