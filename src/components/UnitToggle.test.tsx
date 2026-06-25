import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UnitToggle from "./UnitToggle";
import type { HeightUnit } from "../types";

const heightOptions = [
  { value: "cm" as HeightUnit, label: "cm", tooltip: "e.g. 150 cm" },
  { value: "m" as HeightUnit, label: "m", tooltip: "e.g. 1.6 m" },
  { value: "m+cm" as HeightUnit, label: "m+cm", tooltip: "e.g. 1 m 66 cm" },
  { value: "ft+in" as HeightUnit, label: "ft+in", tooltip: "e.g. 5 ft 5 in" },
];

describe("UnitToggle", () => {
  it("renders all options", () => {
    render(
      <UnitToggle
        value='cm'
        options={heightOptions}
        onChange={() => {}}
        ariaLabel='Height unit'
      />,
    );
    expect(screen.getByText("cm")).toBeInTheDocument();
    expect(screen.getByText("m")).toBeInTheDocument();
    expect(screen.getByText("m+cm")).toBeInTheDocument();
    expect(screen.getByText("ft+in")).toBeInTheDocument();
  });

  it("calls onChange when a different option is selected", async () => {
    const handleChange = vi.fn();
    render(
      <UnitToggle
        value='cm'
        options={heightOptions}
        onChange={handleChange}
        ariaLabel='Height unit'
      />,
    );
    await userEvent.click(screen.getByText("m"));
    expect(handleChange).toHaveBeenCalledWith("m");
  });

  it("does not call onChange when the selected option is clicked again", async () => {
    const handleChange = vi.fn();
    render(
      <UnitToggle
        value='cm'
        options={heightOptions}
        onChange={handleChange}
        ariaLabel='Height unit'
      />,
    );
    await userEvent.click(screen.getByText("cm"));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
