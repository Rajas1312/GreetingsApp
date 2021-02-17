const mongoose = require('mongoose');

const GreetingsSchema = mongoose.Schema({
    name: String,
    greeting: String
}, {
    timestamps: true
});

const greeting = mongoose.model('Greetings', GreetingsSchema);

class GreetingModel {
    create = (req) => {
        console.log("req in model ", req);
        return new Promise((resolve, reject) => {
            greeting.create(req).then(data => {
                console.log("sucessfull", data);
                resolve(data);
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        })
    }
}
module.exports = new GreetingModel();