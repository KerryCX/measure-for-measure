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

const cardSx = {
  background: "#F5D020",
  borderRadius: 1.5,
  padding: { xs: 0.75, sm: 3 },
  textAlign: "center",
  mt: { xs: 1, sm: 2 },
  maxWidth: 280,
  mx: "auto",
  pb: 2,
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

const BMIResult = ({ result }: BMIResultProps) => {
  const [showCategory, setShowCategory] = useState(false);

  if (!result) {
    return (
      <Box sx={cardSx}>
        <Typography variant='body1' sx={{ color: "#2D1A00", fontWeight: 600 }}>
          Enter a valid height and weight to see your BMI
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={cardSx}>
      <Typography
        variant='h3'
        sx={{
          fontFamily: "Fraunces, serif",
          fontWeight: 700,
          color: "#2D1A00",
          fontSize: { xs: "2.5rem", sm: "3rem" },
        }}
      >
        {result.value}
      </Typography>
      <Typography
        variant='subtitle2'
        sx={{ color: "#2D1A00", mb: { xs: 0.5, sm: 1 } }}
      >
        BMI
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={showCategory}
            onChange={(e) => setShowCategory(e.target.checked)}
            size='small'
            slotProps={{ input: { "aria-checked": showCategory } }}
          />
        }
        label='Show category'
        sx={{ color: "#2D1A00" }}
      />
      {showCategory && (
        <Typography
          variant='body1'
          sx={{
            mt: 1,
            color: "#2D1A00",
            fontWeight: 600,
          }}
        >
          {BMI_CATEGORIES[result.category].label}
        </Typography>
      )}
    </Box>
  );
};

export default BMIResult;
