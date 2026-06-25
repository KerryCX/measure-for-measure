import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BMIResult from "./BMIResult";
import type { BMIResult as BMIResultType } from "../types";

const normalResult: BMIResultType = { value: 24.2, category: "normal" };

describe("BMIResult", () => {
  it("renders nothing when result is null", () => {
    const { container } = render(<BMIResult result={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the BMI value", () => {
    render(<BMIResult result={normalResult} />);
    expect(screen.getByText("BMI: 24.2")).toBeInTheDocument();
  });

  it("does not show category by default", () => {
    render(<BMIResult result={normalResult} />);
    expect(screen.queryByText("Normal weight")).not.toBeInTheDocument();
  });

  it("shows category when toggle is switched on", async () => {
    render(<BMIResult result={normalResult} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("Normal weight")).toBeInTheDocument();
  });

  it("hides category when toggle is switched off again", async () => {
    render(<BMIResult result={normalResult} />);
    await userEvent.click(screen.getByRole("switch"));
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.queryByText("Normal weight")).not.toBeInTheDocument();
  });
});
