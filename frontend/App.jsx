import React, { useEffect, useState } from 'react';
import socket from './src/socket.js';
import Timeline from './Timeline';
import WordInput from './WordInput';
import WordCloud3D from './src/WordCloud3D';
import SplashScreen from './src/SplashScreen';

export default function App() {
    const [words, setWords] = useState([]);
    const [showUI, setShowUI] = useState(false);
    const [showingSplash, setShowingSplash] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWords();
        socket.on('newWord', ({ word }) => {
            setWords(prev => {
                const found = prev.find(w => w.text === word);
                if (found) {
                    return prev.map(w => w.text === word 
                        ? { ...w, size: w.size + 2, isNew: true } 
                        : w
                    );
                } else {
                    return [...prev, { text: word, size: 2, isNew: true }];
                }
            });
            playPopSound();
        });

        return () => socket.off('newWord');
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowingSplash(false);
            setShowUI(true);
        }, 3000); // Adjust the duration as needed
        return () => clearTimeout(timer);
    }, []);

    const playPopSound = () => {
        const audio = new Audio('/sfx/pop.mp3');
        audio.volume = 0.2;
        audio.play().catch(console.error);
    };

    const fetchWords = async (month) => {
        try {
            const url = month 
                ? `/api/words?month=${month}` 
                : '/api/words';
            const res = await fetch(url);
            const data = await res.json();
            showWordsGradually(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch words');
        }
    };

    const showWordsGradually = (data) => {
        setWords([]);
        let idx = 0;
        const interval = setInterval(() => {
            if (idx >= data.length) {
                clearInterval(interval);
                return;
            }
            setWords(prev => [...prev, { ...data[idx], isNew: true }]);
            idx++;
        }, 100);
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        fetchWords(month);
    };

    const submitWord = async (val) => {
        const word = val.trim().toLowerCase();
        if (!word) return;

        try {
            const resp = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word })
            });
            
            if (!resp.ok) {
                const error = await resp.json();
                console.error('Error submitting word:', error);
                return;
            }

            // Server will emit the word through socket.io
        } catch (err) {
            console.error('Error submitting word:', err);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="app-container">
            {showingSplash && <SplashScreen />}
            {showUI && (
                <>
                    <Timeline onSelectMonth={handleMonthSelect} />
                    <WordInput onSubmit={(word) => socket.emit('newWord', { word })} />
                    <WordCloud3D words={words} />
                </>
            )}
        </div>
    );
}
