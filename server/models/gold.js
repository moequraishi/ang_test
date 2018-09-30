mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ninja_gold', {useNewUrlParser: true });

var GoldSchema = new mongoose.Schema({
  gold: {type: Number, required: false},
  name: {type: String, required: false, minLength: 5, maxLength:35}
}, {timestamps: true});

mongoose.model('Gold', GoldSchema);

var Gold = mongoose.model('Gold');

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Gold', GoldSchema);
