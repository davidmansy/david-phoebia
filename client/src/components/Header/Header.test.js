import React from "react";
import { render } from "@testing-library/react";
import Header from "./index";

describe("My Header component", () => {
  test("renders a logo", () => {
    const { getByText } = render(<Header />);
    const textElement = getByText(/logo.svg/i);
    expect(textElement).toBeInTheDocument();
  });

  test("renders a title", () => {
    const { getByText } = render(<Header />);
    const textElement = getByText(/phoebia/i);
    expect(textElement).toBeInTheDocument();
  });
});
