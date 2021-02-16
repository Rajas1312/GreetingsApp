const Greeting = require('../models/greeting.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.greeting) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const greeting = new Greeting({
        name: req.body.name || "Untitled Note",
        greeting: req.body.greeting
    });

    // Save Note in the database
    greeting.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Greeting.find()
        .then(greeting => {
            res.send(greeting);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Greeting.findById(req.params.greetingId)
        .then(greeting => {
            if (!greeting) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.greetingId
                });
            }
            res.send(greeting);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.greetingId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.greetingId
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.greeting) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Greeting.findByIdAndUpdate(req.params.greetingId, {
        name: req.body.name || "Untitled Note",
        greeting: req.body.greeting
    }, { new: true })
        .then(greeting => {
            if (!greeting) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.greetingId
                });
            }
            res.send(greeting);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.greetingId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.greetingId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Greeting.findByIdAndRemove(req.params.greetingId)
        .then(greeting => {
            if (!greeting) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.greetingId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.greetingId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.greetingId
            });
        });
};