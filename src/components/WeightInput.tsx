import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UnitToggle from "./UnitToggle";
import type { WeightUnit, WeightValue } from "../types";
import { convertKgToWeight, convertWeightToKg } from "../utils";
import InputAdornment from "@mui/material/InputAdornment";

const WEIGHT_OPTIONS = [
  { value: "kg" as WeightUnit, label: "Kilograms", tooltip: "e.g. 65 kg" },
  { value: "lbs" as WeightUnit, label: "Pounds", tooltip: "e.g. 125 lbs" },
  {
    value: "st+lbs" as WeightUnit,
    label: "Stone & Pounds",
    tooltip: "e.g. 9 st 4lbs",
  },
];

type SingleLimit = { min: number; max: number };
type DoubleLimit = {
  primaryMin: number;
  primaryMax: number;
  secondaryMin: number;
  secondaryMax: number;
};

const WEIGHT_LIMITS: Record<WeightUnit, SingleLimit | DoubleLimit> = {
  kg: { min: 10, max: 500 },
  lbs: { min: 22, max: 1100 },
  "st+lbs": {
    primaryMin: 1,
    primaryMax: 78,
    secondaryMin: 0,
    secondaryMax: 13,
  },
};

interface WeightInputProps {
  value: WeightValue;
  onChange: (value: WeightValue) => void;
  onError: (message: string) => void;
}

const WeightInput = ({ value, onChange, onError }: WeightInputProps) => {
  const handleUnitChange = (newUnit: WeightUnit) => {
    const kg = convertWeightToKg(value);
    const converted = convertKgToWeight(kg, newUnit);
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
        `Weight must be between ${primaryMin} and ${primaryMax} ${primaryLabel}`,
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

  const isDouble = value.unit === "st+lbs";
  const primaryLabel = value.unit === "st+lbs" ? "st" : value.unit;
  const secondaryLabel = "lbs";

  const limits = WEIGHT_LIMITS[value.unit];
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
        ariaLabel='Weight unit'
        value={value.unit}
        options={WEIGHT_OPTIONS}
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
          sx={{ width: 120 }}
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
            sx={{ width: 120 }}
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

export default WeightInput;
