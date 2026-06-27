import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { BMI_CATEGORIES } from "../constants";
import type { BMIResult as BMIResultType } from "../types";

interface BMIResultProps {
  result: BMIResultType | null;
}

// Shared card styles for both the null state and result state
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

/**
 * Displays the calculated BMI value on a yellow card.
 * When result is null shows a prompt instead.
 * Category is hidden by default behind a show/dismiss button pattern.
 */
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

      {!showCategory ? (
        <Button
          onClick={() => setShowCategory(true)}
          variant='outlined'
          size='small'
          sx={{
            color: "#2D1A00",
            borderColor: "#2D1A00",
            textTransform: "none",
            "&:hover": {
              borderColor: "#2D1A00",
              background: "rgba(0,0,0,0.05)",
            },
          }}
        >
          Show category
        </Button>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          <Typography
            variant='body1'
            sx={{ color: "#2D1A00", fontWeight: 600 }}
          >
            {BMI_CATEGORIES[result.category].label}
          </Typography>
          <IconButton
            onClick={() => setShowCategory(false)}
            aria-label='Hide category'
            size='small'
            sx={{ color: "#2D1A00" }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default BMIResult;
