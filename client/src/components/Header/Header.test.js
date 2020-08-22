import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./index";

describe("My Header component", () => {
  test("renders a logo", () => {
    render(<Header />);
    expect(screen.getByText(/logo.svg/i)).toBeInTheDocument();
  });

  test("renders a title", () => {
    render(<Header />);
    expect(screen.getByText(/phoebia/i)).toBeInTheDocument();
  });
});
