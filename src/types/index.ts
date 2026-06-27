// Unit types for height input modes
export type HeightUnit = "cm" | "m" | "m+cm" | "ft+in";

// Unit types for weight input modes
export type WeightUnit = "kg" | "lbs" | "st+lbs";

export type Sex = "male" | "female";

export type AppMode = "bmi" | "converter";

// Used by single-field inputs (cm, m, kg, lbs)
export interface SingleLimit {
  min: number;
  max: number;
}

// Used by double-field inputs (m+cm, ft+in, st+lbs)
export interface DoubleLimit {
  primaryMin: number;
  primaryMax: number;
  secondaryMin: number;
  secondaryMax: number;
}

// Height value carries the selected unit plus one or two numeric fields.
// secondary is only present for double units (ft+in, m+cm)
export interface HeightValue {
  unit: HeightUnit;
  primary: number;
  secondary?: number;
}

// Weight value carries the selected unit plus one or two numeric fields.
// secondary is only present for st+lbs (the lbs portion)
export interface WeightValue {
  unit: WeightUnit;
  primary: number;
  secondary?: number;
}

export type BMICategory = "underweight" | "normal" | "overweight" | "obese";

export interface BMIResult {
  value: number;
  category: BMICategory;
}
