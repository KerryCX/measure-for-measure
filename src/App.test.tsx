import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("shows the get your BMI button initially", () => {
    render(<App />);
    expect(screen.getByText("Get your BMI")).toBeInTheDocument();
  });

  it("shows error if submitted with no values", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Get your BMI"));
    expect(screen.getByText("Please enter a valid height")).toBeInTheDocument();
  });

  it("shows BMI result after valid submission", async () => {
    render(<App />);
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[0], "170");
    fireEvent.blur(inputs[0]);
    await userEvent.type(inputs[1], "70");
    fireEvent.blur(inputs[1]);
    await userEvent.click(screen.getByText("Get your BMI"));
    expect(screen.getByText("24.2")).toBeInTheDocument();
  });

  it("shows Reset button after valid submission", async () => {
    render(<App />);
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[0], "170");
    fireEvent.blur(inputs[0]);
    await userEvent.type(inputs[1], "70");
    fireEvent.blur(inputs[1]);
    await userEvent.click(screen.getByText("Get your BMI"));
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("resets everything when Reset is clicked", async () => {
    render(<App />);
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[0], "170");
    fireEvent.blur(inputs[0]);
    await userEvent.type(inputs[1], "70");
    fireEvent.blur(inputs[1]);
    await userEvent.click(screen.getByText("Get your BMI"));
    await userEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Get your BMI")).toBeInTheDocument();
    expect(screen.queryByText("24.2")).not.toBeInTheDocument();
  });

  it("shows Update button when inputs change after submission", async () => {
    render(<App />);
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[0], "170");
    fireEvent.blur(inputs[0]);
    await userEvent.type(inputs[1], "70");
    fireEvent.blur(inputs[1]);
    await userEvent.click(screen.getByText("Get your BMI"));
    await userEvent.type(inputs[0], "5");
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  it("does not update BMI when out of range value is submitted", async () => {
    render(<App />);
    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.type(inputs[0], "170");
    fireEvent.blur(inputs[0]);
    await userEvent.type(inputs[1], "70");
    fireEvent.blur(inputs[1]);
    await userEvent.click(screen.getByText("Get your BMI"));
    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[0], "999");
    await userEvent.click(screen.getByText("Update"));
    expect(screen.queryByText("24.2")).not.toBeInTheDocument();
    expect(screen.getByText("Please enter a valid height")).toBeInTheDocument();
  });
});
