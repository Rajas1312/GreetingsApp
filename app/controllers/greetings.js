const service = require('../services/greetings.js');

//Create and Save a new Note

exports.create = (req, res) => {
    // Create a Note
    const greeting = {
        name: req.body.name || "Untitled Note",
        greeting: req.body.greeting
    };
    service.create(greeting, (err, result) => {
        if (err) {
            res.status(500).send({
                sucess: false,
                message: "Some error occurred while creating the Note."
            })
        } else {
            res.status(200).send({
                sucess: true,
                message: "created greetings sucessfully",
                result: result
            });
        }
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (res) => {
    service.findAll((err, result) => {
        if (err) {
            res.status(404).send({
                sucess: false,
                message: "could not find any entries"
            })
        } else {
            res.status(200).send({
                sucess: true,
                message: "found greetings sucessfully",
                result: result
            })
        }
    })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    const greetingId = req.params.greetingId
    service.findOne(greetingId, (err, result) => {
        if (err) {
            res.status(500).send({
                sucess: false,
                message: "could not find the entry"
            })
        } else {
            res.status(200).send({
                sucess: true,
                message: "found greetings sucessfully",
                result: result
            })
        }
    })
};

exports.update = (req, res) => {
    const greeting = {
        name: req.body.name,
        message: req.body.message,
        greetingID: req.params.greetingId
    }
    service.update(greeting, (err, result) => {
        if (err) {
            res.status(500).send({
                sucess: false,
                message: "could not find the entry"
            })
        } else {
            res.status(200).send({
                sucess: true,
                message: "found greetings sucessfully",
                result: result
            })
        }
    })
}

exports.delete = (req, res) => {
    const greetingId = req.params.greetingId;
    service.delete(greetingId, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "greeting not found with id " + greetingID
            })
        } else {
            res.status(200).send({
                success: true,
                message: "greeting deleted successfully!",
                result: result
            })
        }
    })
}