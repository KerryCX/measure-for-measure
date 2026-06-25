import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UnitToggle from "./components/UnitToggle";
import type { HeightUnit, WeightUnit } from "./types";

const App = () => {
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom>
        Measure for Measure
      </Typography>

      <Typography variant='subtitle1' gutterBottom>
        Height
      </Typography>
      <UnitToggle
        value={heightUnit}
        options={[
          { value: "cm", label: "cm" },
          { value: "m", label: "m" },
          { value: "m+cm", label: "m+cm" },
          { value: "ft+in", label: "ft+in" },
        ]}
        onChange={setHeightUnit}
      />

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
