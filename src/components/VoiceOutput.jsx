import React, { useEffect } from 'react';

const VoiceOutput = ({ text }) => {
  useEffect(() => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }, [text]);

  return text ? <p>Answer: {text}</p> : null;
};

export default VoiceOutput;
