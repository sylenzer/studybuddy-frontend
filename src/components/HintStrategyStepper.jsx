// src/components/HintStrategyStepper.jsx
const HintStrategyStepper = ({ currentStep, setCurrentStep }) => {
  const stepsItems = ["Socratic", "Multiple Choice", "Roadmap", "Step by Step"];

  const goNext = () => {
    setCurrentStep(Math.min(stepsItems.length, currentStep + 1));
  };

  const goBack = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  return (
    <div className="stepper-container">
      <ul className="stepper-list" aria-label="Hint Strategies">
        {stepsItems.map((item, idx) => (
          <li
            key={item}
            className={`step-item ${currentStep === idx + 1 ? "active" : ""} ${currentStep > idx + 1 ? "complete" : ""}`}
          >
            <div className="step-icon">
              {currentStep > idx + 1 ? <span className="checkmark">✔</span> : <span>{idx + 1}</span>}
            </div>
            <div className="step-label">{item}</div>
          </li>
        ))}
      </ul>
      <div className="stepper-buttons">
        <button onClick={goBack} disabled={currentStep === 1}>Previous</button>
        <button onClick={goNext} disabled={currentStep === stepsItems.length}>Next</button>
      </div>
    </div>
  );
};

export default HintStrategyStepper;
