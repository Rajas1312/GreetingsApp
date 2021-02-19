const mongoose = require('mongoose');

const GreetingsSchema = mongoose.Schema({
    name: String,
    greeting: String
}, {
    timestamps: true
});

const Greeting = mongoose.model('Greetings', GreetingsSchema);

class GreetingModel {
    create = (req, callback) => {
        const greeting = new Greeting({
            name: req.name || "Untitled Note",
            greeting: req.greeting
        });

        // Save Note in the database
        greeting.save((err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
        console.log("in models", req)
    };
}
module.exports = new GreetingModel();