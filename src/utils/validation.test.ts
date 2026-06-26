import { describe, it, expect } from "vitest";
import { isHeightValid, isWeightValid } from "./validation";

describe("isHeightValid", () => {
  describe("centimetres", () => {
    it("returns true for valid cm", () => {
      expect(isHeightValid({ unit: "cm", primary: 170 })).toBe(true);
    });

    it("returns true for valid cm at lower limit", () => {
      expect(isHeightValid({ unit: "cm", primary: 50 })).toBe(true);
    });

    it("returns true for valid cm, at higher limit", () => {
      expect(isHeightValid({ unit: "cm", primary: 300 })).toBe(true);
    });

    it("returns false for cm too low", () => {
      expect(isHeightValid({ unit: "cm", primary: 30 })).toBe(false);
    });

    it("returns false for cm too low, just below minimum limit", () => {
      expect(isHeightValid({ unit: "cm", primary: 49.9 })).toBe(false);
    });

    it("returns false for cm too high, just above maximum limit", () => {
      expect(isHeightValid({ unit: "cm", primary: 300.1 })).toBe(false);
    });

    it("returns false for cm too high", () => {
      expect(isHeightValid({ unit: "cm", primary: 400 })).toBe(false);
    });

    it("returns false when primary is 0", () => {
      expect(isHeightValid({ unit: "cm", primary: 0 })).toBe(false);
    });
  });

  describe("metres", () => {
    it("returns true for valid m", () => {
      expect(isHeightValid({ unit: "m", primary: 1.7 })).toBe(true);
    });

    it("returns true for valid m, at lower limit", () => {
      expect(isHeightValid({ unit: "m", primary: 0.5 })).toBe(true);
    });

    it("returns true for valid m, at higher limit", () => {
      expect(isHeightValid({ unit: "m", primary: 3 })).toBe(true);
    });

    it("returns false for m too low", () => {
      expect(isHeightValid({ unit: "m", primary: 0.3 })).toBe(false);
    });

    it("returns false for m too low, just below minimum limit", () => {
      expect(isHeightValid({ unit: "m", primary: 0.29 })).toBe(false);
    });

    it("returns false for m too high, just above maximum limit", () => {
      expect(isHeightValid({ unit: "m", primary: 3.1 })).toBe(false);
    });

    it("returns false for m too high", () => {
      expect(isHeightValid({ unit: "m", primary: 4 })).toBe(false);
    });
  });

  describe("metres and centimetres", () => {
    it("returns true for valid m+cm, at lower limit", () => {
      expect(isHeightValid({ unit: "m+cm", primary: 0, secondary: 50 })).toBe(
        true,
      );
    });

    it("returns true for valid m+cm", () => {
      expect(isHeightValid({ unit: "m+cm", primary: 1, secondary: 70 })).toBe(
        true,
      );
    });

    it("returns true for valid m+cm, at higher limit", () => {
      expect(isHeightValid({ unit: "m+cm", primary: 3, secondary: 0 })).toBe(
        true,
      );
    });

    it("returns true for valid m+cm, secondary equals secondary limit", () => {
      expect(isHeightValid({ unit: "m+cm", primary: 2, secondary: 99 })).toBe(
        true,
      );
    });

    it("returns false for valid m+cm, primary at higher limit, seconary above zero", () => {
      expect(isHeightValid({ unit: "m+cm", primary: 3, secondary: 1 })).toBe(
        false,
      );
    });

    it("returns false for valid m+cm, with invalid secondary, just above secondary limit", () => {
      expect(isHeightValid({ unit: "m+cm", primary: 2, secondary: 100 })).toBe(
        false,
      );
    });

    it("returns false for m+cm with invalid secondary", () => {
      expect(isHeightValid({ unit: "m+cm", primary: 1, secondary: 666 })).toBe(
        false,
      );
    });
  });
  describe("feet and inches", () => {
    it("returns true for valid ft+in", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 5, secondary: 7 })).toBe(
        true,
      );
    });

    it("returns true for valid ft+in, at lower limit", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 1, secondary: 7.7 })).toBe(
        true,
      );
    });
    // 19.7 118.1
    it("returns true for valid ft+in, at higher limit", () => {
      expect(
        isHeightValid({ unit: "ft+in", primary: 9, secondary: 10.1 }),
      ).toBe(true);
    });

    it("returns false for ft+in, just below lower limit", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 1, secondary: 7.6 })).toBe(
        false,
      );
    });

    it("returns false for ft+in, below lower limit", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 1, secondary: 1 })).toBe(
        false,
      );
    });

    it("returns false for ft+in with invalid primary", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 0, secondary: 12 })).toBe(
        false,
      );
    });

    it("returns false for ft+in with invalid primary", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 0, secondary: 60 })).toBe(
        false,
      );
    });

    it("returns false for ft+in with invalid secondary", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 5, secondary: 15 })).toBe(
        false,
      );
    });

    it("returns false for ft+in, just above lower limit", () => {
      expect(
        isHeightValid({ unit: "ft+in", primary: 9, secondary: 10.2 }),
      ).toBe(false);
    });

    it("returns false for ft+in, above lower limit", () => {
      expect(isHeightValid({ unit: "ft+in", primary: 10, secondary: 1 })).toBe(
        false,
      );
    });
  });
});

describe("isWeightValid", () => {
  describe("kilograms", () => {
    it("returns true for valid kg, at lower limit", () => {
      expect(isWeightValid({ unit: "kg", primary: 10 })).toBe(true);
    });

    it("returns true for valid kg", () => {
      expect(isWeightValid({ unit: "kg", primary: 70 })).toBe(true);
    });

    it("returns true for valid kg, at higher limit", () => {
      expect(isWeightValid({ unit: "kg", primary: 500 })).toBe(true);
    });

    it("returns false for kg too low", () => {
      expect(isWeightValid({ unit: "kg", primary: 5 })).toBe(false);
    });

    it("returns false for valid kg, just below lower limit", () => {
      expect(isWeightValid({ unit: "kg", primary: 9.9 })).toBe(false);
    });

    it("returns false for kg too high", () => {
      expect(isWeightValid({ unit: "kg", primary: 600 })).toBe(false);
    });

    it("returns false for kg too high, just above limit", () => {
      expect(isWeightValid({ unit: "kg", primary: 501 })).toBe(false);
    });

    it("returns false when primary is 0", () => {
      expect(isWeightValid({ unit: "kg", primary: 0 })).toBe(false);
    });
  });

  describe("pounds", () => {
    it("returns true for valid lbs", () => {
      expect(isWeightValid({ unit: "lbs", primary: 150 })).toBe(true);
    });
    it("returns true for valid lbs, at lower limit", () => {
      expect(isWeightValid({ unit: "lbs", primary: 22 })).toBe(true);
    });

    it("returns true for valid lbs, at higher limit", () => {
      expect(isWeightValid({ unit: "lbs", primary: 1100 })).toBe(true);
    });

    it("returns false for valid lbs, just below lower limit", () => {
      expect(isWeightValid({ unit: "lbs", primary: 21.9 })).toBe(false);
    });

    it("returns false for valid lbs too low", () => {
      expect(isWeightValid({ unit: "lbs", primary: 18 })).toBe(false);
    });

    it("returns false for valid lbs, just above higher limit", () => {
      expect(isWeightValid({ unit: "lbs", primary: 1101 })).toBe(false);
    });

    it("returns false for valid lbs too high", () => {
      expect(isWeightValid({ unit: "lbs", primary: 1200 })).toBe(false);
    });
  });

  describe("stones and pounds", () => {
    it("returns true for valid st+lbs", () => {
      expect(isWeightValid({ unit: "st+lbs", primary: 10, secondary: 4 })).toBe(
        true,
      );
    });

    it("returns true for valid st+lbs, at lower limit", () => {
      expect(isWeightValid({ unit: "st+lbs", primary: 1, secondary: 8 })).toBe(
        true,
      );
    });

    it("returns true for valid st+lbs, at higher limit", () => {
      expect(isWeightValid({ unit: "st+lbs", primary: 78, secondary: 8 })).toBe(
        true,
      );
    });

    it("returns false for valid st+lbs, just below lower limit", () => {
      expect(
        isWeightValid({ unit: "st+lbs", primary: 1, secondary: 7.9 }),
      ).toBe(false);
    });

    it("returns false for valid st+lbs, just above higher limit", () => {
      expect(
        isWeightValid({ unit: "st+lbs", primary: 78, secondary: 8.1 }),
      ).toBe(false);
    });

    it("returns false for st+lbs with invalid secondary", () => {
      expect(
        isWeightValid({ unit: "st+lbs", primary: 10, secondary: 20 }),
      ).toBe(false);
    });
  });
});
