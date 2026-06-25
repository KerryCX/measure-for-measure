import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { BMI_CATEGORIES } from "../constants";
import type { BMIResult as BMIResultType } from "../types";

interface BMIResultProps {
  result: BMIResultType | null;
}

const BMIResult = ({ result }: BMIResultProps) => {
  const [showCategory, setShowCategory] = useState(false);

  if (!result) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h5'>BMI: {result.value}</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={showCategory}
            onChange={(e) => setShowCategory(e.target.checked)}
          />
        }
        label='Show category'
      />
      {showCategory && (
        <Typography variant='body1'>
          {BMI_CATEGORIES[result.category].label}
        </Typography>
      )}
    </Box>
  );
};

export default BMIResult;
