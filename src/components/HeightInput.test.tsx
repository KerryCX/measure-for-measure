import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeightInput from "./HeightInput";
import type { HeightValue } from "../types";

const defaultValue: HeightValue = { unit: "cm", primary: 0 };

describe("HeightInput", () => {
  it("renders a single input for cm", () => {
    render(<HeightInput value={defaultValue} onChange={() => {}} />);
    expect(screen.getByLabelText("cm")).toBeInTheDocument();
    expect(screen.queryByLabelText("m")).not.toBeInTheDocument();
  });

  it("renders two inputs for m+cm", () => {
    render(
      <HeightInput value={{ unit: "m+cm", primary: 0 }} onChange={() => {}} />,
    );
    expect(screen.getByLabelText("m")).toBeInTheDocument();
    expect(screen.getByLabelText("cm")).toBeInTheDocument();
  });

  it("renders two inputs for ft+in", () => {
    render(
      <HeightInput value={{ unit: "ft+in", primary: 0 }} onChange={() => {}} />,
    );
    expect(screen.getByLabelText("ft")).toBeInTheDocument();
    expect(screen.getByLabelText("in")).toBeInTheDocument();
  });

  it("calls onChange when primary value changes", async () => {
    const handleChange = vi.fn();
    render(<HeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText("cm"), "170");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onChange when unit changes", async () => {
    const handleChange = vi.fn();
    render(<HeightInput value={defaultValue} onChange={handleChange} />);
    await userEvent.click(screen.getByText("m"));
    expect(handleChange).toHaveBeenCalledWith({ unit: "m", primary: 0 });
  });
});
