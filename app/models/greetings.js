const mongoose = require('mongoose');

const GreetingsSchema = mongoose.Schema({
    name: { type: String, required: true },
    greeting: { type: String, required: true }
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
            name: greetings.name,
            greeting: greetings.greeting
        });

        greeting.save(callback)
    };

    /**
     * @description serching all greetings from database
     * @param {*}callback 
     */

    findAll = (callback) => {
        Greeting.find(callback);
    }

    /**
     * @description serach on greeting from database
     * @param {*}callback 
     * @param {*}greetingID
     */

    findOne = (greetingID, callback) => {
        Greeting.findById(greetingID, callback)
    }

    /**
     * @description Update greetings using object id
     * @param {*} greeting 
     * @param {*}callback 
     */

    update = (greeting, callback) => {
        Greeting.findByIdAndUpdate(greeting.greetingID, {
            name: greeting.name,
            greeting: greeting.greeting
        }, { new: true }, callback)
    }

    /**
     * @description delete greetings using object id
     * @param {*} greetingId 
     * @param {*}callback 
     */

    deleteById = (greetingId, callback) => {
        Greeting.findByIdAndRemove(greetingId, callback);
    }
}
module.exports = new GreetingModel();