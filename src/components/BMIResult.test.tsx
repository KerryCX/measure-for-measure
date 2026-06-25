import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BMIResult from "./BMIResult";
import type { BMIResult as BMIResultType } from "../types";

const normalResult: BMIResultType = { value: 24.2, category: "normal" };

describe("BMIResult", () => {
  it("renders prompt when result is null", () => {
    render(<BMIResult result={null} />);
    expect(
      screen.getByText("Enter a valid height and weight to see your BMI"),
    ).toBeInTheDocument();
  });

  it("renders the BMI value", () => {
    render(<BMIResult result={normalResult} />);
    expect(screen.getByText("24.2")).toBeInTheDocument();
    expect(screen.getByText("BMI")).toBeInTheDocument();
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
