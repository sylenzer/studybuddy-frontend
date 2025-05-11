// src/components/HintStrategyStepper.jsx
import { useState } from "react";

const HintStrategyStepper = () => {
  const [steps, setSteps] = useState({
    stepsItems: ["Socratic", "Multiple Choice", "Roadmap", "Step by Step"],
    currentStep: 1,
  });

  const goNext = () => {
    setSteps((prev) => ({
      ...prev,
      currentStep: Math.min(prev.stepsItems.length, prev.currentStep + 1),
    }));
  };

  const goBack = () => {
    setSteps((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1),
    }));
  };

  return (
    <div className="stepper-container">
      <ul className="stepper-list" aria-label="Hint Strategies">
        {steps.stepsItems.map((item, idx) => (
          <li
            key={item}
            className={`step-item ${steps.currentStep === idx + 1 ? "active" : ""} ${steps.currentStep > idx + 1 ? "complete" : ""}`}
          >
            <div className="step-icon">
              {steps.currentStep > idx + 1 ? (
                <span className="checkmark">✔</span>
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
            <div className="step-label">{item}</div>
          </li>
        ))}
      </ul>
      <div className="stepper-buttons">
        <button onClick={goBack} disabled={steps.currentStep === 1}>
          Previous
        </button>
        <button onClick={goNext} disabled={steps.currentStep === steps.stepsItems.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HintStrategyStepper;
