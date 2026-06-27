import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import HeightInput from "./components/HeightInput";
import WeightInput from "./components/WeightInput";
import BMIResult from "./components/BMIResult";
import MeasureCard from "./components/MeasureCard";
import type {
  HeightValue,
  WeightValue,
  BMIResult as BMIResultType,
} from "./types";
import { calculateBMI } from "./utils";
import { convertHeightToCm, convertWeightToKg } from "./utils/conversions";
import { isHeightValid, isWeightValid } from "./utils/validation";

const App = () => {
  const [height, setHeight] = useState<HeightValue>({ unit: "cm", primary: 0 });
  const [weight, setWeight] = useState<WeightValue>({ unit: "kg", primary: 0 });
  const [result, setResult] = useState<BMIResultType | null>(null);
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

  const buttonLabel = !submitted ? "Get your BMI" : dirty ? "Update" : "Reset";
  const handleButtonClick =
    buttonLabel === "Reset" ? handleReset : handleSubmit;

  return (
    <Container
      maxWidth='sm'
      component='main'
      sx={{
        padding: { xs: 0.75, sm: 4 },
        borderRadius: 4,
        mt: 2,
      }}
    >
      <Typography variant='h4' gutterBottom>
        Measure for Measure
      </Typography>

      <MeasureCard label='Height' background='#F0652A'>
        <HeightInput
          value={height}
          onChange={handleHeightChange}
          onError={setErrorMessage}
        />
      </MeasureCard>

      <MeasureCard label='Weight' background='#F5A623'>
        <WeightInput
          value={weight}
          onChange={handleWeightChange}
          onError={setErrorMessage}
        />
      </MeasureCard>

      <Button
        variant='contained'
        fullWidth
        onClick={handleButtonClick}
        sx={{
          background: "#FFFFFF",
          color: "#7A2E0E",
          border: "2px solid #7A2E0E",
          fontSize: "1.2rem",
          width: "auto",
          fontWeight: 700,
          borderRadius: "999px",
          py: { xs: 0.75, sm: 1.5 },
          mb: { xs: 0.75, sm: 2 },
          mx: "auto",
          display: "block",
          fontFamily: "Fraunces, serif",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          "&:hover": {
            background: "#FFF5F0",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          },
          textTransform: "none",
        }}
      >
        {buttonLabel}
      </Button>

      {submitted && <BMIResult result={result} />}

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{
          content: {
            sx: {
              backgroundColor: "#C62828",
              color: "#FFFFFF",
              fontWeight: 600,
            },
          },
        }}
      />
    </Container>
  );
};

export default App;
