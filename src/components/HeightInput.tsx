import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import UnitToggle from "./UnitToggle";
import type { HeightUnit, HeightValue } from "../types";
import { convertCmToHeight, convertHeightToCm } from "../utils";

interface HeightInputProps {
  value: HeightValue;
  onChange: (value: HeightValue) => void;
  onError: (message: string) => void;
}

const HEIGHT_OPTIONS = [
  { value: "cm" as HeightUnit, label: "Centimetres", tooltip: "e.g. 150 cm" },
  { value: "m" as HeightUnit, label: "Metres", tooltip: "Metres (e.g. 1.6 m)" },
  {
    value: "m+cm" as HeightUnit,
    label: "Metres & centimetres",
    tooltip: "e.g. 1 m 66 cm",
  },
  {
    value: "ft+in" as HeightUnit,
    label: "Feet & inches",
    tooltip: "e.g. 5 ft 5 in",
  },
];

type SingleLimit = { min: number; max: number };
type DoubleLimit = {
  primaryMin: number;
  primaryMax: number;
  secondaryMin: number;
  secondaryMax: number;
};

const HEIGHT_LIMITS: Record<HeightUnit, SingleLimit | DoubleLimit> = {
  cm: { min: 50, max: 300 },
  m: { min: 0.5, max: 3 },
  "m+cm": { primaryMin: 0, primaryMax: 3, secondaryMin: 0, secondaryMax: 99 },
  "ft+in": { primaryMin: 1, primaryMax: 9, secondaryMin: 0, secondaryMax: 11 },
};

const HeightInput = ({ value, onChange, onError }: HeightInputProps) => {
  const handleUnitChange = (newUnit: HeightUnit) => {
    const cm = convertHeightToCm(value);
    const converted = convertCmToHeight(cm, newUnit);
    onChange(converted);
  };

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    onChange({ ...value, primary: isNaN(parsed) ? 0 : parsed });
  };

  const handlePrimaryBlur = () => {
    if (!value.primary) return;
    if (value.primary < primaryMin || value.primary > primaryMax) {
      onError(
        `Height must be between ${primaryMin} and ${primaryMax} ${primaryLabel}`,
      );
      onChange({ ...value, primary: 0 });
    }
  };

  const handleSecondaryBlur = () => {
    if (!value.secondary) return;
    if (value.secondary < secondaryMin || value.secondary > secondaryMax) {
      onError(
        `Value must be between ${secondaryMin} and ${secondaryMax} ${secondaryLabel}`,
      );
      onChange({ ...value, secondary: 0 });
    }
  };

  const handleSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    onChange({ ...value, secondary: isNaN(parsed) ? 0 : parsed });
  };

  const handlePrimaryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handlePrimaryBlur();
  };

  const handleSecondaryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSecondaryBlur();
  };

  const isDouble = value.unit === "m+cm" || value.unit === "ft+in";
  const primaryLabel =
    value.unit === "ft+in" ? "ft" : value.unit === "m+cm" ? "m" : value.unit;
  const secondaryLabel = value.unit === "ft+in" ? "in" : "cm";

  const limits = HEIGHT_LIMITS[value.unit];
  const primaryMin = isDouble
    ? (limits as DoubleLimit).primaryMin
    : (limits as SingleLimit).min;
  const primaryMax = isDouble
    ? (limits as DoubleLimit).primaryMax
    : (limits as SingleLimit).max;
  const secondaryMin = isDouble ? (limits as DoubleLimit).secondaryMin : 0;
  const secondaryMax = isDouble ? (limits as DoubleLimit).secondaryMax : 0;

  return (
    <Box>
      <UnitToggle
        ariaLabel='Height unit'
        value={value.unit}
        options={HEIGHT_OPTIONS}
        onChange={handleUnitChange}
      />
      <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}>
        <TextField
          type='number'
          value={value.primary || ""}
          onChange={handlePrimaryChange}
          onBlur={handlePrimaryBlur}
          onKeyDown={handlePrimaryKeyDown}
          size='small'
          sx={{ width: 150 }}
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
            value={value.secondary || ""}
            onChange={handleSecondaryChange}
            onBlur={handleSecondaryBlur}
            onKeyDown={handleSecondaryKeyDown}
            size='small'
            sx={{ width: 150 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    {secondaryLabel}
                  </InputAdornment>
                ),
                inputProps: { min: secondaryMin, max: secondaryMax },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default HeightInput;
