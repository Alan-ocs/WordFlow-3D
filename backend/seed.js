// backend/seed.js
const Word = require('./models/Word');
require('./db');

(async function seed() {
  try {
    await Word.deleteMany({});
    console.log('Cleared words');

    const initial = ['Docker','React','NodeJS','Three','Cloud','Minimal'];
    for (const text of initial) {
      const times = Math.floor(Math.random() * 5) + 3;
      for (let i=0; i<times; i++){
        await Word.create({ text: text.toLowerCase() });
      }
    }
    console.log('Seed complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
