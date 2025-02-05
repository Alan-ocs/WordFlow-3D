// backend/routes.js
const express = require('express');
const router = express.Router();
const Word = require('./models/Word');
const { canSubmitWord } = require('./spamProtection');

// GET /api/words
router.get('/words', async (req, res) => {
  try {
    const pipeline = [
      { 
        $group: {
          _id: '$text',
          size: { $sum: 1 }
        }
      },
      { $sort: { size: -1 } }
    ];
    const result = await Word.aggregate(pipeline);
    const words = result.map(r => ({ text: r._id, size: r.size }));
    res.json(words);
  } catch (err) {
    console.error('Error fetching words:', err);
    res.status(500).json({ error: 'Error fetching words' });
  }
});

// POST /api/submit
router.post('/submit', async (req, res) => {
  const { word } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!word || typeof word !== 'string') {
    return res.status(400).json({ error: 'Invalid word' });
  }

  const allowed = await canSubmitWord(ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Limite de 5 palavras/dia por IP' });
  }

  try {
    await Word.create({ text: word.trim().toLowerCase(), ip });
    // Emite evento real-time
    req.io.emit('newWord', { word: word.trim().toLowerCase() });
    res.json({ message: 'Word submitted successfully' });
  } catch (err) {
    console.error('Error submitting word:', err);
    res.status(500).json({ error: 'Error submitting word' });
  }
});

module.exports = router;
