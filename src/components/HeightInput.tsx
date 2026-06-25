import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UnitToggle from "./UnitToggle";
import type { HeightUnit, HeightValue } from "../types";
import { convertCmToHeight, convertHeightToCm } from "../utils";

const HEIGHT_OPTIONS = [
  { value: "cm" as HeightUnit, label: "cm" },
  { value: "m" as HeightUnit, label: "m" },
  { value: "m+cm" as HeightUnit, label: "m+cm" },
  { value: "ft+in" as HeightUnit, label: "ft+in" },
];

interface HeightInputProps {
  value: HeightValue;
  onChange: (value: HeightValue) => void;
}

const HeightInput = ({ value, onChange }: HeightInputProps) => {
  const handleUnitChange = (newUnit: HeightUnit) => {
    const cm = convertHeightToCm(value);
    const converted = convertCmToHeight(cm, newUnit);
    onChange(converted);
  };

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, primary: parseFloat(e.target.value) || 0 });
  };

  const handleSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, secondary: parseFloat(e.target.value) || 0 });
  };

  const isDouble = value.unit === "m+cm" || value.unit === "ft+in";
  const primaryLabel =
    value.unit === "ft+in" ? "ft" : value.unit === "m+cm" ? "m" : value.unit;
  const secondaryLabel = value.unit === "ft+in" ? "in" : "cm";

  return (
    <Box>
      <UnitToggle
        value={value.unit}
        options={HEIGHT_OPTIONS}
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
            label={secondaryLabel}
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

export default HeightInput;
