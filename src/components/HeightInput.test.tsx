import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeightInput from "./HeightInput";
import type { HeightValue } from "../types";

const defaultValue: HeightValue = { unit: "cm", primary: 0 };

describe("HeightInput", () => {
  it("renders a single input for cm", () => {
    render(
      <HeightInput
        value={defaultValue}
        onChange={() => {}}
        onError={() => {}}
      />,
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Centimetres")).toBeInTheDocument();
  });

  it("renders two inputs for m+cm", () => {
    render(
      <HeightInput
        value={{ unit: "m+cm", primary: 0 }}
        onChange={() => {}}
        onError={() => {}}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);
  });

  it("renders two inputs for ft+in", () => {
    render(
      <HeightInput
        value={{ unit: "ft+in", primary: 0 }}
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
      <HeightInput
        value={defaultValue}
        onChange={handleChange}
        onError={() => {}}
      />,
    );
    await userEvent.type(screen.getByRole("spinbutton"), "170");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onChange when unit changes", async () => {
    const handleChange = vi.fn();
    render(
      <HeightInput
        value={defaultValue}
        onChange={handleChange}
        onError={() => {}}
      />,
    );
    await userEvent.click(screen.getByText("Metres"));
    expect(handleChange).toHaveBeenCalledWith({ unit: "m", primary: 0 });
  });

  it("calls onChange when secondary value changes for m+cm", async () => {
    const handleChange = vi.fn();
    render(
      <HeightInput
        value={{ unit: "m+cm", primary: 1 }}
        onChange={handleChange}
        onError={() => {}}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[1], "70");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onError and resets to 0 when primary value is out of range on blur", async () => {
    const handleChange = vi.fn();
    const handleError = vi.fn();
    render(
      <HeightInput
        value={{ unit: "cm", primary: 400 }}
        onChange={handleChange}
        onError={handleError}
      />,
    );
    const input = screen.getByRole("spinbutton");
    fireEvent.blur(input);
    expect(handleError).toHaveBeenCalledWith(
      "Height must be between 50 and 300 cm",
    );
    expect(handleChange).toHaveBeenCalledWith({ unit: "cm", primary: 0 });
  });

  it("validates on Enter key press", async () => {
    const handleChange = vi.fn();
    const handleError = vi.fn();
    render(
      <HeightInput
        value={{ unit: "cm", primary: 400 }}
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
      <HeightInput
        value={{ unit: "ft+in", primary: 5, secondary: 15 }}
        onChange={handleChange}
        onError={handleError}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.blur(inputs[1]);
    expect(handleError).toHaveBeenCalledWith(
      "Value must be between 0 and 11 in",
    );
    expect(handleChange).toHaveBeenCalledWith({
      unit: "ft+in",
      primary: 5,
      secondary: 0,
    });
  });
});
