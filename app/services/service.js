const service = require('../models/greeting.model.js')

class GreetingsService {
    create = () => {
        service.create = (req, res) => {
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
        }
    }
}
module.exports = new GreetingsService();
