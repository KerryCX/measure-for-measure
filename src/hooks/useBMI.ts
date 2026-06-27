import { useState } from "react";
import type { HeightValue, WeightValue, BMIResult } from "../types";
import { calculateBMI } from "../utils";
import { convertHeightToCm, convertWeightToKg } from "../utils/conversions";
import { isHeightValid, isWeightValid } from "../utils/validation";

/**
 * Manages all BMI calculation state and logic.
 * Returns values and handlers for App to wire up to the UI.
 */
const useBMI = () => {
  const [height, setHeight] = useState<HeightValue>({ unit: "cm", primary: 0 });
  const [weight, setWeight] = useState<WeightValue>({ unit: "kg", primary: 0 });
  const [result, setResult] = useState<BMIResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleHeightChange = (value: HeightValue) => {
    setHeight(value);
    if (submitted) setDirty(true);
  };

  const handleWeightChange = (value: WeightValue) => {
    setWeight(value);
    if (submitted) setDirty(true);
  };

  const handleSubmit = () => {
    if (!isHeightValid(height)) {
      setErrorMessage("Please enter a valid height");
      setResult(null);
      return;
    }
    if (!isWeightValid(weight)) {
      setErrorMessage("Please enter a valid weight");
      setResult(null);
      return;
    }
    const heightCm = convertHeightToCm(height);
    const weightKg = convertWeightToKg(weight);
    const bmi = calculateBMI(weightKg, heightCm);
    if (!bmi) {
      setErrorMessage("Please enter a valid height and weight");
      setResult(null);
      return;
    }
    setResult(bmi);
    setSubmitted(true);
    setDirty(false);
  };

  const handleReset = () => {
    setHeight({ unit: "cm", primary: 0 });
    setWeight({ unit: "kg", primary: 0 });
    setResult(null);
    setSubmitted(false);
    setDirty(false);
  };

  // Label cycles through three states: initial, dirty after submission, clean after submission
  const buttonLabel = !submitted ? "Get your BMI" : dirty ? "Update" : "Reset";
  const handleButtonClick =
    buttonLabel === "Reset" ? handleReset : handleSubmit;
  return {
    height,
    weight,
    result,
    submitted,
    errorMessage,
    buttonLabel,
    handleHeightChange,
    handleWeightChange,
    handleButtonClick,
    clearError: () => setErrorMessage(null),
    reportError: (message: string) => setErrorMessage(message),
  };
};

export default useBMI;
