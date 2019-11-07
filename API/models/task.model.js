const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  /**
   * @param {String} name - name of the task
   * @param {String} worker - who do the task
   * @param {Number} repeat - Number of days to loop
   * @param {Boolean} shared - boolean to true if shared
   */
    name: {type: String, required: true, max: 100}, //name of the task
    worker: {type: String, required: true, max: 100}, //who is gonna do the task
    repeat: {type: Number, required: false}, //number of days to repeat the task
    shared: {type: Boolean, default: false} //If it's shared between the colocs (need to have a repeat value in this case)
});


// Export the model
module.exports = mongoose.model('Task', TaskSchema);