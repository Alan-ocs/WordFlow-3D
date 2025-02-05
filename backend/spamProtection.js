// backend/spamProtection.js
const Word = require('./models/Word');

async function canSubmitWord(ip) {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0);
    const end   = new Date(now.getFullYear(), now.getMonth(), now.getDate() +1, 0,0,0);
    const count = await Word.countDocuments({
      ip,
      timestamp: { $gte: start, $lt: end }
    });
    return count < 5;
  } catch (err) {
    console.error('Spam check error:', err);
    return true;
  }
}

module.exports = { canSubmitWord };
