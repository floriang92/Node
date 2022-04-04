const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: { type: String, default: null },
  path: { type: String, default: null, required: true },
  content: { type:String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('File', FileSchema);