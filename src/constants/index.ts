import type { BMICategory } from "../types";

export const BMI_CATEGORIES: Record<
  BMICategory,
  { min: number; max: number; label: string }
> = {
  underweight: { min: 0, max: 18.5, label: "Underweight" },
  normal: { min: 18.5, max: 25, label: "Normal weight" },
  overweight: { min: 25, max: 30, label: "Overweight" },
  obese: { min: 30, max: Infinity, label: "Obese" },
};

export const KG_PER_LB = 0.453592;
export const LB_PER_KG = 2.20462;
export const LB_PER_STONE = 14;
export const CM_PER_INCH = 2.54;
export const CM_PER_FOOT = 30.48;
export const CM_PER_METRE = 100;
