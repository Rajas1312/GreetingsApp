const mongoose = require('mongoose');

const GreetingsSchema = mongoose.Schema({
    name: String,
    greeting: String
}, {
    timestamps: true
});

const Greeting = mongoose.model('Greetings', GreetingsSchema);

class GreetingModel {

    /**
     * @description saving  greetings in the database
     * @param {*} greetings 
     * @param {*}callback 
     */

    create = (greetings, callback) => {
        const greeting = new Greeting({
            name: greetings.name || "Untitled Note",
            greeting: greetings.greeting
        });

        greeting.save((err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    };

    /**
     * @description serching all greetings from database
     * @param {*}callback 
     */

    findAll = (callback) => {
        Greeting.find((err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    /**
     * @description serach on greeting from database
     * @param {*}callback 
     * @param {*}greetingID
     */

    findOne = (greetingID, callback) => {
        Greeting.findById(greetingID, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    /**
     * @description Update greetings using object id
     * @param {*} greeting 
     * @param {*}callback 
     */

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

    /**
     * @description delete greetings using object id
     * @param {*} greetingId 
     * @param {*}callback 
     */

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