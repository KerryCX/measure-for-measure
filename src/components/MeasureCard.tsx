import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface MeasureCardProps {
  label: string;
  children: React.ReactNode;
  background: string;
}

const MeasureCard = ({ label, children, background }: MeasureCardProps) => {
  return (
    <Box
      sx={{
        background,
        borderRadius: 3,
        padding: { xs: 1.5, sm: 3 },
        mb: { xs: 1, sm: 3 },
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
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
