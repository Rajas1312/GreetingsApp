const mongoose = require('mongoose');

const GreetingsSchema = mongoose.Schema({
    name: String,
    greeting: String
}, {
    timestamps: true
});

const Greeting = mongoose.model('Greetings', GreetingsSchema);

class GreetingModel {
    create = (greetings, callback) => {
        const greeting = new Greeting({
            name: greetings.name || "Untitled Note",
            greeting: greetings.greeting
        });

        // Save Note in the database
        greeting.save((err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    };

    findAll = (callback) => {
        Greeting.find((err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    findOne = (greetingID, callback) => {
        Greeting.findById(greetingID, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    update = (greeting, callback) => {
        Greeting.findByIdAndUpdate(greeting.greetingID, {
            name: greeting.name,
            message: greeting.message || "Empty Message"
        }, { new: true }, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    deleteById = (greetingId, callback) => {
        Greeting.findByIdAndRemove(greetingId, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }
}
module.exports = new GreetingModel();