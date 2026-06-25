export type Sex = "male" | "female";

export type WeightUnit = "kg" | "lbs" | "st+lbs";

export type HeightUnit = "cm" | "m" | "m+cm" | "ft+in";

export type AppMode = "bmi" | "converter";

export interface WeightValue {
  unit: WeightUnit;
  primary: number;
  secondary?: number; // for st+lbs: lbs value; for lbs alone: undefined
}

export interface HeightValue {
  unit: HeightUnit;
  primary: number;
  secondary?: number; // for ft+in: inches; for m+cm: cm
}

export interface BMIResult {
  value: number;
  category: BMICategory;
}

export type BMICategory = "underweight" | "normal" | "overweight" | "obese";
