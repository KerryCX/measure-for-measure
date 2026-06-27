import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface MeasureCardProps {
  label: string;
  children: React.ReactNode;
  background: string;
  boxShadow: string;
  sx?: object;
}

const MeasureCard = ({
  label,
  children,
  background,
  boxShadow,
  sx,
}: MeasureCardProps) => {
  return (
    <Box
      sx={{
        background,
        borderRadius: 1.5,
        padding: { xs: 1, sm: 3 },
        mb: { xs: 0.75, sm: 3 },
        boxShadow,
        ...sx,
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
