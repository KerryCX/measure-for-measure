import Box from "@mui/material/Box";
import UnitToggle from "./UnitToggle";
import UnitInput from "./UnitInput";
import type {
  HeightUnit,
  HeightValue,
  SingleLimit,
  DoubleLimit,
} from "../types";
import { convertCmToHeight, convertHeightToCm } from "../utils";

const HEIGHT_OPTIONS = [
  { value: "cm" as HeightUnit, label: "Centimetres", tooltip: "e.g. 150 cm" },
  { value: "m" as HeightUnit, label: "Metres", tooltip: "e.g. 1.6 m" },
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

const HEIGHT_LIMITS: Record<HeightUnit, SingleLimit | DoubleLimit> = {
  cm: { min: 50, max: 300 },
  m: { min: 0.5, max: 3 },
  "m+cm": { primaryMin: 0, primaryMax: 3, secondaryMin: 0, secondaryMax: 99 },
  "ft+in": { primaryMin: 1, primaryMax: 9, secondaryMin: 0, secondaryMax: 11 },
};

interface HeightInputProps {
  value: HeightValue;
  onChange: (value: HeightValue) => void;
  onError: (message: string) => void;
}

/**
 * Height input with unit toggle and one or two number fields.
 * Converts the current value to cm before switching units so the
 * number stays consistent across unit changes.
 */
const HeightInput = ({ value, onChange, onError }: HeightInputProps) => {
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

  /**
   * Converts the current value to cm, then back to the new unit
   * so the displayed number stays consistent across unit changes.
   */
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

  const handlePrimaryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handlePrimaryBlur();
  };

  const handleSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    onChange({ ...value, secondary: isNaN(parsed) ? 0 : parsed });
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

  const handleSecondaryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSecondaryBlur();
  };

  return (
    <Box>
      <UnitToggle
        ariaLabel='Height unit'
        value={value.unit}
        options={HEIGHT_OPTIONS}
        onChange={handleUnitChange}
      />
      <UnitInput
        primaryValue={value.primary}
        primaryLabel={primaryLabel}
        primaryMin={primaryMin}
        primaryMax={primaryMax}
        onPrimaryChange={handlePrimaryChange}
        onPrimaryBlur={handlePrimaryBlur}
        onPrimaryKeyDown={handlePrimaryKeyDown}
        isDouble={isDouble}
        secondaryValue={value.secondary}
        secondaryLabel={secondaryLabel}
        secondaryMin={secondaryMin}
        secondaryMax={secondaryMax}
        onSecondaryChange={handleSecondaryChange}
        onSecondaryBlur={handleSecondaryBlur}
        onSecondaryKeyDown={handleSecondaryKeyDown}
      />
    </Box>
  );
};

export default HeightInput;
