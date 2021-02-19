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
                message: err.message || "Some error occurred while creating the Note."
            })
        } else {
            res.status(200).send(result);
        }
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    service.findAll((err, result) => {
        if (err) {
            res.status(404).send(err)
        } else {
            res.status(200).send(result)
        }
    })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    const greetingId = req.params.greetingId
    service.findOne(greetingId, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(result)
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
            res.status(500).send(err)
        } else {
            res.status(200).send(result)
        }
    })
}

// // Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     Greeting.findByIdAndRemove(req.params.greetingId)
//         .then(greeting => {
//             if (!greeting) {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.greetingId
//                 });
//             }
//             res.send({ message: "Note deleted successfully!" });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.greetingId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete note with id " + req.params.greetingId
//             });
//         });
//};