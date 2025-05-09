// src/components/EnvDebugger.jsx
const EnvDebugger = () => {
  return (
    <div className="p-4 bg-yellow-100 text-black rounded mt-4">
      <strong>Runtime VITE_BACKEND_URL:</strong>
      <pre>{import.meta.env.VITE_BACKEND_URL || "🚨 Not available"}</pre>
    </div>
  );
};

export default EnvDebugger;
