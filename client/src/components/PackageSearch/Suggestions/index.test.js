import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Suggestions from "./index";
import { axe } from "jest-axe";

const data = [
  { package: { name: "react", version: "16.3.1" } },
  { package: { name: "redux", version: "7.0.0" } },
  { package: { name: "react-redux", version: "4.2.0" } },
];

describe("My Suggestions component", () => {
  test("renders a list of suggested packages (received as props)", () => {
    render(<Suggestions packages={data} />);

    const suggestionsLi = screen.getAllByRole("listitem");

    expect(suggestionsLi).toHaveLength(data.length);
    expect(suggestionsLi[2]).toHaveTextContent("react-redux");
  });

  test("calls the handleSelectPackage function (received as props) when a list item is clicked", () => {
    const handleSelectPackageMock = jest.fn();

    render(
      <Suggestions
        packages={data}
        handleSelectPackage={handleSelectPackageMock}
      />
    );

    fireEvent.click(screen.getAllByRole("listitem")[1]);

    expect(handleSelectPackageMock).toHaveBeenCalledTimes(1);
    expect(handleSelectPackageMock).toHaveBeenCalledWith({
      name: "redux",
      version: "7.0.0",
    });
  });

  test("renders a list of suggested packages (received as props) without accessibility violations", async () => {
    const { container } = render(<Suggestions packages={data} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
