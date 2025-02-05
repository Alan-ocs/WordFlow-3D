import React from 'react';

const months = [
  { label: 'Jan', value: 1 },
  { label: 'Feb', value: 2 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 },
  { label: 'May', value: 5 },
  { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 },
  { label: 'Aug', value: 8 },
  { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 },
  { label: 'Nov', value: 11 },
  { label: 'Dec', value: 12 }
];

export default function Timeline({ visible }) {
  const handleMonthClick = (m) => {
    console.log('Month selected:', m);
    // fetch /api/words?month=... se quiser filtrar
  };

  return (
    <div className={`timeline-container ${visible ? 'visible' : ''}`}>
      {months.map(m => (
        <button key={m.value} onClick={() => handleMonthClick(m.value)}>
          {m.label}
        </button>
      ))}
    </div>
  );
}
