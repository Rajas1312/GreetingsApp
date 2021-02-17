const model = require('../models/greetings.js');
class GreetingService {
    createServices = (req) => {
        console.log("Request data in service", req)
        return model.create(req).then(data => {
            return data;
        }).catch(err => {
            return err
        })
    }
}
module.exports = new GreetingService();