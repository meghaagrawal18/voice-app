import React, { useState } from 'react';
import nlp from 'compromise';
import VoiceInput from './components/VoiceInput';
import VoiceOutput from './components/VoiceOutput';

function App() {
  const [answer, setAnswer] = useState("");

  const answers = {
    skills: "I have experience with React, JavaScript, Node.js, Express, MongoDB, and PostgreSQL.",
    name: "My name is Prisha.",
    about: "I'm a software developer with a strong interest in building user-friendly web applications.",
    unknown: "Sorry, I don't know the answer to that.",
  };

  function getIntent(text) {
    const doc = nlp(text.toLowerCase());
    if (doc.has('skills') || doc.has('ability') || doc.has('experience')) {
      return 'skills';
    }
    if (doc.has('name')) {
      return 'name';
    }
    if (doc.has('yourself') || doc.has('who')) {
      return 'about';
    }
    return 'unknown';
  }

  const handleVoiceInput = (spokenText) => {
    const intent = getIntent(spokenText);
    setAnswer(answers[intent]);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎤 Voice Q&A with Compromise</h1>
      <VoiceInput onResult={handleVoiceInput} />
      <VoiceOutput text={answer} />
    </div>
  );
}

export default App;
