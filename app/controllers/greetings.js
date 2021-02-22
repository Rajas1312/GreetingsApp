const service = require('../services/greetings.js');
const Joi = require('joi');

const ControllerDataValidation = Joi.object().keys({
    name: Joi.string().required(),
    greeting: Joi.string().required()
})

class GreetingController {
    create = ((req, res,) => {
        // Create a Note
        const greeting = {
            name: req.body.name || "Untitled Note",
            greeting: req.body.greeting
        };
        const validation = ControllerDataValidation.validate(greeting);
        if (validation.error) {
            res.status(400).send({
                success: false,
                message: " enter in valid format"
            })
        } else {
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
        }

    });

    // Retrieve and return all notes from the database.
    findAll = (req, res) => {
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
    findOne = (req, res) => {
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

    update = (req, res) => {
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

    delete = (req, res) => {
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
}
module.exports = new GreetingController();