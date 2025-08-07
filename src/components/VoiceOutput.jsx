import React, { useEffect } from 'react';

const VoiceOutput = ({ text }) => {
  useEffect(() => {
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  return text ? <p>Answer: {text}</p> : null;
};

export default VoiceOutput;
