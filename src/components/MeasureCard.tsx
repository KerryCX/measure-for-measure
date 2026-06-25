import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface MeasureCardProps {
  label: string;
  children: React.ReactNode;
}

const MeasureCard = ({ label, children }: MeasureCardProps) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #F5D020, #F5A623, #F0652A)",
        borderRadius: 2,
        padding: 3,
        mb: 3,
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontFamily: "Fraunces, serif",
          fontWeight: 700,
          color: "#2D1A00",
          mb: 2,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default MeasureCard;
