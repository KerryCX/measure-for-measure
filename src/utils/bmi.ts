import type { BMICategory, BMIResult } from "../types";
import { BMI_CATEGORIES } from "../constants";

export const calculateBMI = (
  weightKg: number,
  heightCm: number,
): BMIResult | null => {
  if (!weightKg || !heightCm) return null;

  const heightM = heightCm / 100;
  const value = weightKg / (heightM * heightM);

  // Find the BMI category where the calculated value falls within the min/max range
  const category = (Object.keys(BMI_CATEGORIES) as BMICategory[]).find(
    (key) =>
      value >= BMI_CATEGORIES[key].min && value < BMI_CATEGORIES[key].max,
  );

  if (!category) return null;

  return {
    value: Math.round(value * 10) / 10,
    category,
  };
};
