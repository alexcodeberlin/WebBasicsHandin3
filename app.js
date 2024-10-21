// app.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: '', // Change this to your MySQL password
    database: 'dbprop' // Change this to your MySQL database name
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Route to display properties
app.get('/properties', (req, res) => {
    const query = `
        SELECT properties.*, users.name AS owner_name 
        FROM properties 
        LEFT JOIN users ON properties.owner_id = users.id
    `;
    
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('properties', { properties: results });
    });
});

// Route to add a property
app.post('/add-property', (req, res) => {
    const { title, description, price, location, owner_id } = req.body;
    const query = 'INSERT INTO properties (title, description, price, location, owner_id) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [title, description, price, location, owner_id], (err) => {
        if (err) throw err;
        res.redirect('/properties');
    });
});

// Route to update a property
app.post('/update-property/:id', (req, res) => {
    const { title, description, price, location, owner_id } = req.body;
    const query = 'UPDATE properties SET title = ?, description = ?, price = ?, location = ?, owner_id = ? WHERE id = ?';
    
    db.query(query, [title, description, price, location, owner_id, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/properties');
    });
});

// Route to delete a property
app.post('/delete-property/:id', (req, res) => {
    const query = 'DELETE FROM properties WHERE id = ?';
    
    db.query(query, [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/properties');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
