import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UnitToggle from "./UnitToggle";
import type { WeightUnit, WeightValue } from "../types";
import { convertKgToWeight, convertWeightToKg } from "../utils";
import InputAdornment from "@mui/material/InputAdornment";

const WEIGHT_OPTIONS = [
  {
    value: "kg" as WeightUnit,
    label: "Kilograms",
    tooltip: "e.g. 65 kg",
  },
  {
    value: "lbs" as WeightUnit,
    label: "Pounds",
    tooltip: "e.g. 125 lbs",
  },
  {
    value: "st+lbs" as WeightUnit,
    label: "Stone & Pounds",
    tooltip: "e.g. 9 st 4lbs",
  },
];

interface WeightInputProps {
  value: WeightValue;
  onChange: (value: WeightValue) => void;
}

const WeightInput = ({ value, onChange }: WeightInputProps) => {
  const handleUnitChange = (newUnit: WeightUnit) => {
    const kg = convertWeightToKg(value);
    const converted = convertKgToWeight(kg, newUnit);
    onChange(converted);
  };

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, primary: parseFloat(e.target.value) || 0 });
  };

  const handleSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, secondary: parseFloat(e.target.value) || 0 });
  };

  const isDouble = value.unit === "st+lbs";
  const primaryLabel = value.unit === "st+lbs" ? "st" : value.unit;

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
          size='small'
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>{primaryLabel}</InputAdornment>
              ),
            },
          }}
        />
        {isDouble && (
          <TextField
            type='number'
            value={value.secondary || ""}
            onChange={handleSecondaryChange}
            size='small'
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    {value.secondary || ""}
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default WeightInput;
