import type { HeightUnit, HeightValue, WeightValue } from "../types";
import {
  CM_PER_FOOT,
  CM_PER_INCH,
  CM_PER_METRE,
  KG_PER_LB,
  LB_PER_KG,
  LB_PER_STONE,
} from "../constants";

const roundTo1dp = (value: number): number => Math.round(value * 10) / 10;
const roundTo3dp = (value: number): number => Math.round(value * 1000) / 1000;

export const convertWeightToKg = (weight: WeightValue): number => {
  switch (weight.unit) {
    case "kg":
      return weight.primary;
    case "lbs":
      return weight.primary * KG_PER_LB;
    case "st+lbs":
      return (
        (weight.primary * LB_PER_STONE + (weight.secondary ?? 0)) * KG_PER_LB
      );
  }
};

export const convertHeightToCm = (height: HeightValue): number => {
  switch (height.unit) {
    case "cm":
      return height.primary;
    case "m":
      return height.primary * CM_PER_METRE;
    case "m+cm":
      return height.primary * CM_PER_METRE + (height.secondary ?? 0);
    case "ft+in":
      return (
        height.primary * CM_PER_FOOT + (height.secondary ?? 0) * CM_PER_INCH
      );
  }
};

export const convertKgToWeight = (
  kg: number,
  targetUnit: WeightValue["unit"],
): WeightValue => {
  switch (targetUnit) {
    case "kg":
      return { unit: "kg", primary: roundTo1dp(kg) };
    case "lbs":
      return { unit: "lbs", primary: roundTo1dp(kg * LB_PER_KG) };
    case "st+lbs": {
      const totalLbs = kg * LB_PER_KG;
      const stone = Math.floor(totalLbs / LB_PER_STONE);
      const lbs = roundTo1dp(totalLbs % LB_PER_STONE);
      return { unit: "st+lbs", primary: stone, secondary: lbs };
    }
  }
};

export const convertCmToHeight = (
  cm: number,
  targetUnit: HeightUnit,
): HeightValue => {
  switch (targetUnit) {
    case "cm":
      return { unit: "cm", primary: roundTo1dp(cm) };
    case "m":
      return { unit: "m", primary: roundTo3dp(cm / CM_PER_METRE) };
    case "m+cm": {
      const metres = Math.floor(cm / CM_PER_METRE);
      const remainingCm = roundTo1dp(cm % CM_PER_METRE);
      return { unit: "m+cm", primary: metres, secondary: remainingCm };
    }
    case "ft+in": {
      const totalInches = cm / CM_PER_INCH;
      const feet = Math.floor(totalInches / 12);
      const inches = roundTo1dp(totalInches % 12);
      return { unit: "ft+in", primary: feet, secondary: inches };
    }
  }
};
