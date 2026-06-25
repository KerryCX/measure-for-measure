import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WeightInput from "./WeightInput";
import type { WeightValue } from "../types";

const defaultValue: WeightValue = { unit: "kg", primary: 0 };

describe("WeightInput", () => {
  it("renders a single input for kg", () => {
    render(<WeightInput value={defaultValue} onChange={() => {}} />);
    expect(screen.getByLabelText("kg")).toBeInTheDocument();
    expect(screen.queryByLabelText("lbs")).not.toBeInTheDocument();
  });

  it("renders a single input for lbs", () => {
    render(
      <WeightInput value={{ unit: "lbs", primary: 0 }} onChange={() => {}} />,
    );
    expect(screen.getByLabelText("lbs")).toBeInTheDocument();
  });

  it("renders two inputs for st+lbs", () => {
    render(
      <WeightInput
        value={{ unit: "st+lbs", primary: 0 }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText("st")).toBeInTheDocument();
    expect(screen.getByLabelText("lbs")).toBeInTheDocument();
  });

  it("calls onChange when primary value changes", async () => {
    const handleChange = vi.fn();
    render(<WeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText("kg"), "70");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onChange when unit changes", async () => {
    const handleChange = vi.fn();
    render(<WeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.click(screen.getByText("lbs"));
    expect(handleChange).toHaveBeenCalledWith({ unit: "lbs", primary: 0 });
  });

  it("calls onChange when secondary value changes for st+lbs", async () => {
    const handleChange = vi.fn();
    render(
      <WeightInput
        value={{ unit: "st+lbs", primary: 11 }}
        onChange={handleChange}
      />,
    );
    await userEvent.type(screen.getByLabelText("lbs"), "4");
    expect(handleChange).toHaveBeenCalled();
  });
});
