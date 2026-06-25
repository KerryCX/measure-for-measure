import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WeightInput from "./WeightInput";
import type { WeightValue } from "../types";

const defaultValue: WeightValue = { unit: "kg", primary: 0 };

describe("WeightInput", () => {
  it("renders a single input for kg", () => {
    render(
      <WeightInput
        value={defaultValue}
        onChange={() => {}}
        onError={() => {}}
      />,
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Kilograms")).toBeInTheDocument();
  });

  it("renders a single input for lbs", () => {
    render(
      <WeightInput
        value={{ unit: "lbs", primary: 0 }}
        onChange={() => {}}
        onError={() => {}}
      />,
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Pounds")).toBeInTheDocument();
  });

  it("renders two inputs for st+lbs", () => {
    render(
      <WeightInput
        value={{ unit: "st+lbs", primary: 0 }}
        onChange={() => {}}
        onError={() => {}}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);
  });

  it("calls onChange when primary value changes", async () => {
    const handleChange = vi.fn();
    render(
      <WeightInput
        value={defaultValue}
        onChange={handleChange}
        onError={() => {}}
      />,
    );
    await userEvent.type(screen.getByRole("spinbutton"), "70");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onChange when unit changes", async () => {
    const handleChange = vi.fn();
    render(
      <WeightInput
        value={defaultValue}
        onChange={handleChange}
        onError={() => {}}
      />,
    );
    await userEvent.click(screen.getByText("Pounds"));
    expect(handleChange).toHaveBeenCalledWith({ unit: "lbs", primary: 0 });
  });

  it("calls onChange when secondary value changes for st+lbs", async () => {
    const handleChange = vi.fn();
    render(
      <WeightInput
        value={{ unit: "st+lbs", primary: 11, secondary: 0 }}
        onChange={handleChange}
        onError={() => {}}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[1], "4");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onError and resets to 0 when primary value is out of range on blur", async () => {
    const handleChange = vi.fn();
    const handleError = vi.fn();
    render(
      <WeightInput
        value={{ unit: "kg", primary: 600 }}
        onChange={handleChange}
        onError={handleError}
      />,
    );
    const input = screen.getByRole("spinbutton");
    fireEvent.blur(input);
    expect(handleError).toHaveBeenCalledWith(
      "Weight must be between 10 and 500 kg",
    );
    expect(handleChange).toHaveBeenCalledWith({ unit: "kg", primary: 0 });
  });

  it("validates on Enter key press", async () => {
    const handleChange = vi.fn();
    const handleError = vi.fn();
    render(
      <WeightInput
        value={{ unit: "kg", primary: 600 }}
        onChange={handleChange}
        onError={handleError}
      />,
    );
    const input = screen.getByRole("spinbutton");
    await userEvent.type(input, "{Enter}");
    expect(handleError).toHaveBeenCalled();
  });

  it("calls onError and resets secondary to 0 when out of range on blur", async () => {
    const handleChange = vi.fn();
    const handleError = vi.fn();
    render(
      <WeightInput
        value={{ unit: "st+lbs", primary: 10, secondary: 20 }}
        onChange={handleChange}
        onError={handleError}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.blur(inputs[1]);
    expect(handleError).toHaveBeenCalledWith(
      "Value must be between 0 and 13 lbs",
    );
    expect(handleChange).toHaveBeenCalledWith({
      unit: "st+lbs",
      primary: 10,
      secondary: 0,
    });
  });
});
