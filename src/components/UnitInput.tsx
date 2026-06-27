import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

interface UnitInputProps {
  primaryValue: number;
  primaryLabel: string;
  primaryMin: number;
  primaryMax: number;
  onPrimaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrimaryBlur: () => void;
  onPrimaryKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // secondary fields are only used when isDouble is true
  isDouble: boolean;
  secondaryValue?: number;
  secondaryLabel?: string;
  secondaryMin?: number;
  secondaryMax?: number;
  onSecondaryChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondaryBlur?: () => void;
  onSecondaryKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Renders one or two number inputs with unit labels.
 * When isDouble is true the two fields are joined visually as a pill:
 * the left field loses its right border and right border-radius,
 * the right field loses its left border-radius.
 * Used by HeightInput and WeightInput.
 */
const UnitInput = ({
  primaryValue,
  primaryLabel,
  primaryMin,
  primaryMax,
  onPrimaryChange,
  onPrimaryBlur,
  onPrimaryKeyDown,
  isDouble,
  secondaryValue,
  secondaryLabel,
  secondaryMin,
  secondaryMax,
  onSecondaryChange,
  onSecondaryBlur,
  onSecondaryKeyDown,
}: UnitInputProps) => {
  return (
    <Box sx={{ display: "flex", mt: 2, mb: 1, justifyContent: "center" }}>
      <TextField
        type='number'
        value={primaryValue || ""}
        onChange={onPrimaryChange}
        onBlur={onPrimaryBlur}
        onKeyDown={onPrimaryKeyDown}
        size='small'
        sx={{
          width: { xs: 100, sm: 150 },
          "& .MuiOutlinedInput-root": {
            borderRadius: isDouble ? "999px 0 0 999px" : "999px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRight: isDouble ? "none" : undefined,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>{primaryLabel}</InputAdornment>
            ),
            inputProps: { min: primaryMin, max: primaryMax },
          },
        }}
      />
      {isDouble && (
        <TextField
          type='number'
          value={secondaryValue || ""}
          onChange={onSecondaryChange}
          onBlur={onSecondaryBlur}
          onKeyDown={onSecondaryKeyDown}
          size='small'
          sx={{
            width: { xs: 100, sm: 150 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "0 999px 999px 0",
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>{secondaryLabel}</InputAdornment>
              ),
              inputProps: { min: secondaryMin, max: secondaryMax },
            },
          }}
        />
      )}
    </Box>
  );
};

export default UnitInput;
