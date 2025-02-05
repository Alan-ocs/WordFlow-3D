// backend/models/Word.js
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true, lowercase: true },
  timestamp: { type: Date, default: Date.now },
  ip: String
});

module.exports = mongoose.model('Word', wordSchema);
