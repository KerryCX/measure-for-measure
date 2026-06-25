import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WeightInput from "./WeightInput";
import type { WeightValue } from "../types";

const defaultValue: WeightValue = { unit: "kg", primary: 0 };

describe("WeightInput", () => {
  it("renders a single input for kg", () => {
    render(<WeightInput value={defaultValue} onChange={() => {}} />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Kilograms")).toBeInTheDocument();
  });

  it("renders a single input for lbs", () => {
    render(
      <WeightInput value={{ unit: "lbs", primary: 0 }} onChange={() => {}} />,
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Pounds")).toBeInTheDocument();
  });

  it("renders two inputs for st+lbs", () => {
    render(
      <WeightInput
        value={{ unit: "st+lbs", primary: 0 }}
        onChange={() => {}}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);
  });

  it("calls onChange when primary value changes", async () => {
    const handleChange = vi.fn();
    render(<WeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.type(screen.getByRole("spinbutton"), "70");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onChange when unit changes", async () => {
    const handleChange = vi.fn();
    render(<WeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.click(screen.getByText("Pounds"));
    expect(handleChange).toHaveBeenCalledWith({ unit: "lbs", primary: 0 });
  });

  it("calls onChange when secondary value changes for st+lbs", async () => {
    const handleChange = vi.fn();
    render(
      <WeightInput
        value={{ unit: "st+lbs", primary: 11, secondary: 0 }}
        onChange={handleChange}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[1], "4");
    expect(handleChange).toHaveBeenCalled();
  });
});
