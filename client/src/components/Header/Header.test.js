import React from "react";
import { render } from "@testing-library/react";
import Header from "./index";

test("renders title", () => {
  const { getByText } = render(<Header />);
  const textElement = getByText(/phoebia/i);
  expect(textElement).toBeInTheDocument();
});
