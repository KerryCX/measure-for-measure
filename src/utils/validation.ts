import type { HeightValue, WeightValue } from "../types";

export const isHeightValid = (height: HeightValue): boolean => {
  const { unit, primary, secondary } = height;
  if (primary === undefined || primary === null) return false;
  switch (unit) {
    case "cm":
      return primary >= 50 && primary <= 300;
    case "m":
      return primary >= 0.5 && primary <= 3;
    case "m+cm": {
      const totalCm = primary * 100 + (secondary ?? 0);
      return totalCm >= 50 && totalCm <= 300 && (secondary ?? 0) <= 99;
    }
    case "ft+in": {
      const totalInches = primary * 12 + (secondary ?? 0);
      return (
        totalInches >= 19.7 && totalInches <= 118.1 && (secondary ?? 0) <= 11
      );
    }
  }
};

export const isWeightValid = (weight: WeightValue): boolean => {
  const { unit, primary, secondary } = weight;
  if (!primary) return false;
  switch (unit) {
    case "kg":
      return primary >= 10 && primary <= 500;
    case "lbs":
      return primary >= 22 && primary <= 1100;
    case "st+lbs": {
      const totalLbs = primary * 14 + (secondary ?? 0);
      return totalLbs >= 22 && totalLbs <= 1100 && (secondary ?? 0) <= 13;
    }
  }
};
