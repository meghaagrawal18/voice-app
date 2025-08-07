import React, { useState, useEffect } from 'react';
import VoiceInput from './components/VoiceInput';
import VoiceOutput from './components/VoiceOutput';

function App() {
  const [data, setData] = useState({});
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load Q&A data", err));
  }, []);

  const handleVoiceInput = (question) => {
    const spokenWords = question.toLowerCase().split(" ");

    for (let key in data) {
      const lowerKey = key.toLowerCase();
      const matchCount = spokenWords.filter(word => lowerKey.includes(word)).length;

      if (matchCount >=3) {
        setAnswer(data[key]);
        return;
      }
    }

    setAnswer("Sorry, I don't know the answer to that.");
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎤 Voice Q&A App</h1>
      <VoiceInput onResult={handleVoiceInput} />
      <VoiceOutput text={answer} />
    </div>
  );
}

export default App;
