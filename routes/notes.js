const express = require('express');
const router = express.Router();
const { validateNote, validateNotePatch } = require('../validators/validation');
let newId = 1;
let notes = [];

router.get('/', (req, res) => {
    res.json(notes);
});

router.get('/:id', (req, res) => {
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note) {
        return res.status(404).json({
            status: "error",
            message: "Note not found"
        });
    }
    res.json(note);
});

router.post('/', (req, res) => {
    const { error } = validateNote(req.body);
    if (error)
        return res.status(400).json({
            status: "error",
            message: error.details[0].message
        });
    // const newId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
    const note = {
        id: newId++,
        name: req.body.name,
        content: req.body.content
    };
    notes.push(note);
    res.json(note);
});

router.put('/:id', (req, res) => {
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note)
        return res.status(404).json({
            status: "error",
            message: "Note not found"
        });

    const { error } = validateNote(req.body);
    if (error)
        return res.status(400).json({
            status: "error",
            message: error.details[0].message
        });

    note.name = req.body.name;
    note.content = req.body.content;
    res.json(note);
});

router.patch('/:id', (req, res) => {
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note)
        return res.status(404).json({
            status: "error",
            message: "Note not found"
        });

    const { error } = validateNotePatch(req.body);
    if (error)
        return res.status(400).json({
            status: "error",
            message: error.details[0].message
        });

    if (req.body.name !== undefined) note.name = req.body.name;
    if (req.body.content !== undefined) note.content = req.body.content;
    res.json(note);
});

router.delete('/:id', (req, res) => {
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note)
        return res.status(404).json({
            status: "error",
            message: "Note not found"
        });

    const index = notes.indexOf(note);
    notes.splice(index, 1);
    res.json({ status: "success", message: "Note deleted", deletedNote: note });;
});

module.exports = router;