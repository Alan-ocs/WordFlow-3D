// backend/db.js
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const {
  MONGO_URI = 'mongodb://mongo:27017/wordcloud_db'
} = process.env;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));
