import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const VoiceInput = ({ onResult }) => {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("SpeechRecognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log("Transcript received:", transcript);
      if (onResult && typeof onResult === "function") {
        onResult(transcript);
      }
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      toast.error(`Speech recognition error: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [onResult]);

  const startListening = () => {
    try {
      toast.success("Listening...");
      setListening(true);
      recognitionRef.current?.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
      toast.error("Failed to start speech recognition.");
      setListening(false);
    }
  };

  return (
    <button onClick={startListening} disabled={listening}>
      {listening ? "🎙️ Listening..." : "🎙️ Start Listening"}
    </button>
  );
};

export default VoiceInput;
