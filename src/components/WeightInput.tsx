import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UnitToggle from "./UnitToggle";
import type { WeightUnit, WeightValue } from "../types";
import { convertKgToWeight, convertWeightToKg } from "../utils";

const WEIGHT_OPTIONS = [
  { value: "kg" as WeightUnit, label: "kg" },
  { value: "lbs" as WeightUnit, label: "lbs" },
  { value: "st+lbs" as WeightUnit, label: "st+lbs" },
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
        value={value.unit}
        options={WEIGHT_OPTIONS}
        onChange={handleUnitChange}
      />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          label={primaryLabel}
          type='number'
          value={value.primary || ""}
          onChange={handlePrimaryChange}
          size='small'
        />
        {isDouble && (
          <TextField
            label='lbs'
            type='number'
            value={value.secondary ?? ""}
            onChange={handleSecondaryChange}
            size='small'
          />
        )}
      </Box>
    </Box>
  );
};

export default WeightInput;
