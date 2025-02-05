import React, { useState } from 'react';

function WordInput({ onSubmit, visible }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleClick = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <div className={`word-input-container ${visible ? 'visible' : ''}`}>
      <input
        id="word-input"
        name="word"
        type="text"
        placeholder="Digite uma palavra..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <button onClick={handleClick}>Entrar</button>
    </div>
  );
}

export default WordInput;
