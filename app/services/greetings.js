const model = require('../models/greetings.js');
class GreetingService {

    create = (greetings, callback) => {
        model.create(greetings, (err, result) => {

            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

    findAll = (callback) => {
        model.findAll((err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    findOne = (greetingID, callback) => {
        model.findOne(greetingID, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    update = (greeting, callback) => {
        model.update(greeting, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    delete = (greetingId, callback) => {
        model.deleteById(greetingId, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new GreetingService();