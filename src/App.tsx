import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HeightInput from "./components/HeightInput";
import WeightInput from "./components/WeightInput";
import type { HeightValue, WeightValue } from "./types";

const App = () => {
  const [height, setHeight] = useState<HeightValue>({ unit: "cm", primary: 0 });
  const [weight, setWeight] = useState<WeightValue>({ unit: "kg", primary: 0 });

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
    </Container>
  );
};

export default App;
