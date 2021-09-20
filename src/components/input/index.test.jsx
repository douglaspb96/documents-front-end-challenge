import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Input } from ".";

describe("Input", () => {
  it("should render label text", () => {
    const label = "Alguma Label";
    render(<Input label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
