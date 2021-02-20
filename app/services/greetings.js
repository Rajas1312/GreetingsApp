const model = require('../models/greetings.js');
class GreetingService {

    /**
     * @description Create and save greeting then send response to controller
     * @method create is used to save the greeting
     * @param callback is the callback for controller
     */

    create = (greetings, callback) => {
        model.create(greetings, (err, result) => {

            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

    /**
     * @description Find all the greetings and return response to controller
     * @method findAll is used to retrieve greetings
     * @param callback is the callback for controller
     */

    findAll = (callback) => {
        model.findAll((err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    /**
     * @description Find greeting by id and return response to controller
     * @method findOne is used to retrieve greeting by ID
     * @param callback is the callback for controller
     */

    findOne = (greetingID, callback) => {
        model.findOne(greetingID, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    /**
    * @description Update greeting by id and return response to controller
    * @method update is used to update greeting by ID
    * @param callback is the callback for controller
    */

    update = (greeting, callback) => {
        model.update(greeting, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        });
    }

    /**
 * @description Delete greeting by id and return response to controller
 * @method delete is used to remove greeting by ID
 * @param callback is the callback for controller
 */

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