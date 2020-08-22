import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Suggestions from "./index";
import { axe } from "jest-axe";

describe("My Suggestions component", () => {
  test("renders a list of suggested package", () => {
    const data = [
      { package: { name: "react", version: "16.3.1" } },
      { package: { name: "redux", version: "7.0.0" } },
      { package: { name: "react-redux", version: "4.2.0" } },
    ];
    render(<Suggestions packages={data} />);
    const packages = screen.getAllByRole("listitem");
    packages.forEach((npmPackage, index) => {
      expect(npmPackage).toHaveTextContent(data[index].package.name);
    });
  });

  test("calls the handleSelectPackage function when a list item is clicked", async () => {
    const data = [
      { package: { name: "react", version: "16.3.1" } },
      { package: { name: "redux", version: "7.0.0" } },
      { package: { name: "react-redux", version: "4.2.0" } },
    ];
    const handleSelectPackageMock = jest.fn();
    render(
      <Suggestions
        packages={data}
        handleSelectPackage={handleSelectPackageMock}
      />
    );
    const secondLi = screen.getAllByRole("listitem")[1];
    fireEvent.click(secondLi);
    expect(handleSelectPackageMock).toHaveBeenCalledTimes(1);
    expect(handleSelectPackageMock).toHaveBeenCalledWith({
      name: "redux",
      version: "7.0.0",
    });
  });

  test("renders a list of suggested package without accessibility violations", async () => {
    const data = [
      { package: { name: "react", version: "16.3.1" } },
      { package: { name: "redux", version: "7.0.0" } },
      { package: { name: "react-redux", version: "4.2.0" } },
    ];
    const { container } = render(<Suggestions packages={data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
