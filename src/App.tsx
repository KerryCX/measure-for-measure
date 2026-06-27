import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import HeightInput from "./components/HeightInput";
import WeightInput from "./components/WeightInput";
import BMIResult from "./components/BMIResult";
import MeasureCard from "./components/MeasureCard";
import useBMI from "./hooks/useBMI";

/**
 * Root layout component.
 * All state and logic lives in useBMI — App is responsible for
 * layout and wiring inputs to the hook.
 */
const App = () => {
  const {
    height,
    weight,
    result,
    submitted,
    errorMessage,
    buttonLabel,
    handleHeightChange,
    handleWeightChange,
    handleButtonClick,
    clearError,
    reportError,
  } = useBMI();

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

      <MeasureCard
        label='Height'
        background='#F0652A'
        boxShadow='0 8px 16px rgba(0,0,0,0.2)'
      >
        <HeightInput
          value={height}
          onChange={handleHeightChange}
          onError={reportError}
        />
      </MeasureCard>

      <MeasureCard
        label='Weight'
        background='#F5A623'
        boxShadow='0 8px 16px rgba(0,0,0,0.2)'
      >
        <WeightInput
          value={weight}
          onChange={handleWeightChange}
          onError={reportError}
        />
      </MeasureCard>

      <Button
        variant='contained'
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
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          "&:hover": {
            background: "#FFF5F0",
            boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
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
        onClose={clearError}
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
