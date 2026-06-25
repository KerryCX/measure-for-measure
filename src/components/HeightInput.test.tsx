import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeightInput from "./HeightInput";
import type { HeightValue } from "../types";

const defaultValue: HeightValue = { unit: "cm", primary: 0 };

describe("HeightInput", () => {
  it("renders a single input for cm", () => {
    render(<HeightInput value={defaultValue} onChange={() => {}} />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Centimetres")).toBeInTheDocument();
  });

  it("renders two inputs for m+cm", () => {
    render(
      <HeightInput value={{ unit: "m+cm", primary: 0 }} onChange={() => {}} />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);
  });

  it("renders two inputs for ft+in", () => {
    render(
      <HeightInput value={{ unit: "ft+in", primary: 0 }} onChange={() => {}} />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);
  });

  it("calls onChange when primary value changes", async () => {
    const handleChange = vi.fn();
    render(<HeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.type(screen.getByRole("spinbutton"), "170");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onChange when unit changes", async () => {
    const handleChange = vi.fn();
    render(<HeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.click(screen.getByText("Metres"));
    expect(handleChange).toHaveBeenCalledWith({ unit: "m", primary: 0 });
  });

  it("calls onChange when secondary value changes for m+cm", async () => {
    const handleChange = vi.fn();
    render(
      <HeightInput
        value={{ unit: "m+cm", primary: 1 }}
        onChange={handleChange}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[1], "70");
    expect(handleChange).toHaveBeenCalled();
  });
});
