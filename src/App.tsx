import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UnitToggle from "./components/UnitToggle";
import HeightInput from "./components/HeightInput";
import type { HeightValue, WeightUnit } from "./types";

const App = () => {
  const [height, setHeight] = useState<HeightValue>({ unit: "cm", primary: 0 });
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

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
      <UnitToggle
        value={weightUnit}
        options={[
          { value: "kg", label: "kg" },
          { value: "lbs", label: "lbs" },
          { value: "st+lbs", label: "st+lbs" },
        ]}
        onChange={setWeightUnit}
      />
    </Container>
  );
};

export default App;
