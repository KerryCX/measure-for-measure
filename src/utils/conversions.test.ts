import { describe, it, expect } from "vitest";
import {
  convertWeightToKg,
  convertHeightToCm,
  convertKgToWeight,
  convertCmToHeight,
} from "./conversions";

describe("convertWeightToKg", () => {
  it("returns kg as-is", () => {
    expect(convertWeightToKg({ unit: "kg", primary: 70 })).toBe(70);
  });

  it("converts lbs to kg", () => {
    expect(convertWeightToKg({ unit: "lbs", primary: 154 })).toBeCloseTo(69.85);
  });

  it("converts st+lbs to kg", () => {
    expect(
      convertWeightToKg({ unit: "st+lbs", primary: 11, secondary: 0 }),
    ).toBeCloseTo(69.85);
  });
});

describe("convertHeightToCm", () => {
  it("returns cm as-is", () => {
    expect(convertHeightToCm({ unit: "cm", primary: 170 })).toBe(170);
  });

  it("converts m to cm", () => {
    expect(convertHeightToCm({ unit: "m", primary: 1.7 })).toBe(170);
  });

  it("converts m+cm to cm", () => {
    expect(convertHeightToCm({ unit: "m+cm", primary: 1, secondary: 70 })).toBe(
      170,
    );
  });

  it("converts ft+in to cm", () => {
    expect(
      convertHeightToCm({ unit: "ft+in", primary: 5, secondary: 7 }),
    ).toBeCloseTo(170.18);
  });
});

describe("convertKgToWeight", () => {
  it("returns kg as-is", () => {
    expect(convertKgToWeight(70, "kg")).toEqual({ unit: "kg", primary: 70 });
  });

  it("converts kg to lbs", () => {
    const result = convertKgToWeight(70, "lbs");
    expect(result.unit).toBe("lbs");
    expect(result.primary).toBe(154.3);
  });

  it("converts kg to st+lbs", () => {
    const result = convertKgToWeight(70, "st+lbs");
    expect(result.unit).toBe("st+lbs");
    expect(result.primary).toBe(11);
    expect(result.secondary).toBeCloseTo(0.32, 0);
  });
});

describe("convertCmToHeight", () => {
  it("returns cm as-is", () => {
    expect(convertCmToHeight(170, "cm")).toEqual({ unit: "cm", primary: 170 });
  });

  it("converts cm to m", () => {
    expect(convertCmToHeight(170, "m")).toEqual({ unit: "m", primary: 1.7 });
  });

  it("converts cm to m+cm", () => {
    expect(convertCmToHeight(170, "m+cm")).toEqual({
      unit: "m+cm",
      primary: 1,
      secondary: 70,
    });
  });
  it("converts cm to ft+in", () => {
    const result = convertCmToHeight(170, "ft+in");
    expect(result.unit).toBe("ft+in");
    expect(result.primary).toBe(5);
    expect(result.secondary).toBe(6.9);
  });
});

describe("convertWeightToKg - missing secondary", () => {
  it("converts st+lbs with no lbs value", () => {
    expect(convertWeightToKg({ unit: "st+lbs", primary: 11 })).toBeCloseTo(
      69.85,
    );
  });
});

describe("convertHeightToCm - missing secondary", () => {
  it("converts m+cm with no cm value", () => {
    expect(convertHeightToCm({ unit: "m+cm", primary: 1 })).toBe(100);
  });

  it("converts ft+in with no inches value", () => {
    expect(convertHeightToCm({ unit: "ft+in", primary: 5 })).toBeCloseTo(152.4);
  });
});
