import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
const VoiceInput = ({ onResult }) => {
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check browser compatibility
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("SpeechRecognition is not supported in this browser.");
      return;
    }

    // Create recognition instance
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Handle result
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log("Transcript received:", transcript); // Debugging
      if (onResult && typeof onResult === "function") {
        onResult(transcript);
      }
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const startListening = () => {
    try {
      toast.success("Listening...");
      recognitionRef.current?.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
    }
  };

  return (
    <button onClick={startListening}>
      🎙️ Start Listening
    </button>
  );
};

export default VoiceInput;
