import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HeightInput from "./components/HeightInput";
import WeightInput from "./components/WeightInput";
import BMIResult from "./components/BMIResult";
import type { HeightValue, WeightValue } from "./types";
import { calculateBMI } from "./utils";
import { convertHeightToCm, convertWeightToKg } from "./utils/conversions";

const App = () => {
  const [height, setHeight] = useState<HeightValue>({ unit: "cm", primary: 0 });
  const [weight, setWeight] = useState<WeightValue>({ unit: "kg", primary: 0 });

  const heightCm = convertHeightToCm(height);
  const weightKg = convertWeightToKg(weight);
  const result = calculateBMI(weightKg, heightCm);

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom>
        Measure for Measure
      </Typography>

      <Typography variant='subtitle1' gutterBottom>
        Height
      </Typography>
      <HeightInput value={height} onChange={setHeight} />

      <Typography variant='subtitle1' gutterBottom sx={{ mt: 3 }}>
        Weight
      </Typography>
      <WeightInput value={weight} onChange={setWeight} />

      <BMIResult result={result} />
    </Container>
  );
};

export default App;
