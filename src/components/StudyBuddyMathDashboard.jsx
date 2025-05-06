import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function StudyBuddyMathDashboard() {
  const [customProblem, setCustomProblem] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setCustomProblem(transcript);
  }, [transcript]);

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div className="p-6 w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">📚 StudyBuddy+ Math Dashboard</h1>
      <input
        type="text"
        value={customProblem}
        onChange={(e) => setCustomProblem(e.target.value)}
        placeholder="Type your math problem here"
        className="border border-gray-300 p-2 rounded w-full"
      />
      <div className="mt-4 space-x-2 flex justify-center">
        <button onClick={startListening} className="bg-blue-500 text-white px-4 py-2 rounded">🎙 Speak</button>
        <button onClick={stopListening} className="bg-red-500 text-white px-4 py-2 rounded">🛑 Stop</button>
      </div>
      <p className="mt-4 italic text-center text-gray-500">🎧 Listening: {listening ? "Yes" : "No"}</p>
    </div>
  );
}
