const model = require('../models/greetings.js');
class GreetingService {
    create = (req, callback) => {
        model.create(req, (err, result) => {
            console.log("in services", req);
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }
}
module.exports = new GreetingService();