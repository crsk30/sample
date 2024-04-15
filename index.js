const express = require('express');
const app = express();
const path = require('path');
const { Pool } = require('pg');

// Set Pug as the view engine
app.set('view engine', 'jade');
// Set the directory where your Pug templates will be located
app.set('views',path.join(__dirname, "./views"));

// Define a route to render a Pug template
app.get('/', (req, res) => {
    res.render('index.jade', { title: 'Welcome to My Website' });
});

// Create a new Pool instance with the connection details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kttest',
    password: 'root',
    port: 5432, // Default PostgreSQL port
  });
  
  // Query the database
  pool.query('SELECT * FROM employees', (err, res) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      console.log('Query result:', res.rows[0]);
    }
  
    // Close the connection pool
    pool.end();
  });
  

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
