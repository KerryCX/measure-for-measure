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
    <Box
      sx={{
        background: "linear-gradient(135deg, #F5D020, #F5A623, #F0652A)",
        borderRadius: 3,
        padding: 3,
        mt: 1,
        textAlign: "center",
      }}
    >
      <Typography
        variant='h3'
        sx={{
          fontFamily: "Fraunces, serif",
          fontWeight: 700,
          color: "#2D1A00",
        }}
      >
        {result.value}
      </Typography>
      <Typography variant='subtitle2' sx={{ color: "#2D1A00", mb: 1 }}>
        BMI
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={showCategory}
            onChange={(e) => setShowCategory(e.target.checked)}
            size='small'
            slotProps={{
              input: {
                "aria-checked": showCategory,
              },
            }}
          />
        }
        label='Show category'
        sx={{ color: "#2D1A00" }}
      />
      {showCategory && (
        <Typography
          variant='body1'
          sx={{ mt: 1, color: "#2D1A00", fontWeight: 600 }}
        >
          {BMI_CATEGORIES[result.category].label}
        </Typography>
      )}
    </Box>
  );
};

export default BMIResult;
