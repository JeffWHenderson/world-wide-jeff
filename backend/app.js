const express = require('express');
const app = express();
app.use(express.json());


const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Basic Get Type stuff
app.get('/', (req, res) => {
    res.json({ level_one: [{ lesson_name: "begginner", version: 1 }] });
});

// Start the server
app.listen(port, () => {
    console.log(`Express API listening on port ${port}`);
});