const greeting = require('../controllers/greetings.js');
module.exports = (app) => {
    // Create a new Note
    app.post('/greeting', greeting.create);

    // Retrieve all Notes
    app.get('/greeting', greeting.findAll);

    // Retrieve a single Note with noteId
    app.get('/greeting/:greetingId', greeting.findOne);

    // Update a Note with noteId
    app.put('/greeting/:greetingId', greeting.update);

    // Delete a Note with noteId
    app.delete('/greeting/:greetingId', greeting.delete);
}