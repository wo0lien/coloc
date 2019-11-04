var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('dotenv').config();

var dbUrl = process.env.MONGO_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test'});

mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});

db.once('open', function() {
  console.log('database connected')
});

var ingredientSchema = new Schema({
  name: String,
  type: String,
  qt: String
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient; 