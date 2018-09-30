const mongoose = require('mongoose');

// 1. Connect to the DB
mongoose.connect('mongodb://localhost/anonymous_notes', {useNewUrlParser: true });

// 2. Define the schema
let NoteSchema = new mongoose.Schema({
  note: {type: String, required: true, minLength: 3, maxLength: 255}
}, {timestamps: true});

// 3. Define the Model
mongoose.model('Notes', NoteSchema);
var Notes = mongoose.model('Notes');

mongoose.set('useFindAndModify', false);

// 4. Export the module and model
module.exports = mongoose.model('Notes', NoteSchema);

