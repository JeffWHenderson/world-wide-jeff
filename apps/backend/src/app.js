import express from "express";
import { courses } from "./courses/courses.ts"; // TODO: and now we make a database
const app = express();
app.use(express.json());


const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Basic Get Type stuff
app.get('/:language', (req, res) => {
    const capitalizedString = req.params.language.charAt(0).toUpperCase() + req.params.language.slice(1) // TODO: just fix my types to be lowercase
    res.json(courses[capitalizedString]);
});

// Start the server
app.listen(port, () => {
    console.log(`Express API listening on port ${port}`);
});
