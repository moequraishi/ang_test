const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/product_manager', {useNewUrlParser: true });

let ProductSchema = new mongoose.Schema({
  title: {type: String, required: true, minLength: 3, maxLength: 255},
  price: {type: Number, required: true, min: 1},
  imageUrl: {type: String, required: true, minLength: 3, maxLength: 255}
});
mongoose.model('Product', ProductSchema);

let Product = mongoose.model('Product');

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Product', ProductSchema);
