import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UnitToggle from "./UnitToggle";
import type { HeightUnit, HeightValue } from "../types";
import { convertCmToHeight, convertHeightToCm } from "../utils";

interface HeightInputProps {
  value: HeightValue;
  onChange: (value: HeightValue) => void;
}

const HEIGHT_OPTIONS = [
  {
    value: "cm" as HeightUnit,
    label: "Centimetres",
    tooltip: "e.g. 150 cm",
  },
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
        ariaLabel='Height unit'
        value={value.unit}
        options={HEIGHT_OPTIONS}
        onChange={handleUnitChange}
      />
      <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}>
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
