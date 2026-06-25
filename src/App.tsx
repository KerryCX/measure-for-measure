import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HeightInput from "./components/HeightInput";
import WeightInput from "./components/WeightInput";
import BMIResult from "./components/BMIResult";
import type { HeightValue, WeightValue } from "./types";
import { calculateBMI } from "./utils";
import { convertHeightToCm, convertWeightToKg } from "./utils/conversions";
import MeasureCard from "./components/MeasureCard";

const App = () => {
  const [height, setHeight] = useState<HeightValue>({ unit: "cm", primary: 0 });
  const [weight, setWeight] = useState<WeightValue>({ unit: "kg", primary: 0 });

  const heightCm = convertHeightToCm(height);
  const weightKg = convertWeightToKg(weight);
  const result = calculateBMI(weightKg, heightCm);

  return (
    <Container maxWidth='sm' component='main' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom>
        Measure for Measure
      </Typography>
      <MeasureCard label='Height'>
        <HeightInput value={height} onChange={setHeight} />
      </MeasureCard>
      <MeasureCard label='Weight'>
        <WeightInput value={weight} onChange={setWeight} />
      </MeasureCard>

      <BMIResult result={result} />
    </Container>
  );
};

export default App;
