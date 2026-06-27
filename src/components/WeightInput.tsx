import Box from "@mui/material/Box";
import UnitToggle from "./UnitToggle";
import UnitInput from "./UnitInput";
import type {
  WeightUnit,
  WeightValue,
  SingleLimit,
  DoubleLimit,
} from "../types";
import { convertKgToWeight, convertWeightToKg } from "../utils";

const WEIGHT_OPTIONS = [
  { value: "kg" as WeightUnit, label: "Kilograms", tooltip: "e.g. 65 kg" },
  { value: "lbs" as WeightUnit, label: "Pounds", tooltip: "e.g. 125 lbs" },
  {
    value: "st+lbs" as WeightUnit,
    label: "Stone & Pounds",
    tooltip: "e.g. 9 st 4 lbs",
  },
];

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

/**
 * Weight input with unit toggle and one or two number fields.
 * Converts the current value to kg before switching units so the
 * number stays consistent across unit changes.
 */
const WeightInput = ({ value, onChange, onError }: WeightInputProps) => {
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

  /**
   * Converts the current value to kg, then back to the new unit
   * so the displayed number stays consistent across unit changes.
   */
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
        ariaLabel='Weight unit'
        value={value.unit}
        options={WEIGHT_OPTIONS}
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

export default WeightInput;
