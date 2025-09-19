const express = require('express');
const app = express();
app.use(express.json());
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
    res.json('Notes API');
});

app.use((req, res) => { 
    res.status(404).json({ status: "error", message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: "error", message: "Something broke!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}... Copy`));
