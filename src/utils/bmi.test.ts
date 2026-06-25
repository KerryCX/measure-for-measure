import { describe, it, expect } from "vitest";
import { calculateBMI } from "./bmi";

describe("calculateBMI", () => {
  it("returns null if weight is 0", () => {
    expect(calculateBMI(0, 170)).toBeNull();
  });

  it("returns null if height is 0", () => {
    expect(calculateBMI(70, 0)).toBeNull();
  });

  it("calculates a normal BMI correctly", () => {
    const result = calculateBMI(70, 170);
    expect(result?.value).toBe(24.2);
    expect(result?.category).toBe("normal");
  });

  it("returns underweight category", () => {
    const result = calculateBMI(45, 170);
    expect(result?.category).toBe("underweight");
  });

  it("returns overweight category", () => {
    const result = calculateBMI(85, 170);
    expect(result?.category).toBe("overweight");
  });

  it("returns obese category", () => {
    const result = calculateBMI(100, 170);
    expect(result?.category).toBe("obese");
  });
});
