import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./index";
import { axe } from "jest-axe";

describe("My Input component", () => {
  test("renders a search input", () => {
    render(<Input />);

    expect(
      screen.getByRole("searchbox", { name: /Search Term/i })
    ).toBeInTheDocument();
  });

  test("calls the setSeachTerm function when the input value is updated", async () => {
    const setSearchTermMock = jest.fn();

    render(<Input setSearchTerm={setSearchTermMock} />);

    await userEvent.type(
      screen.getByRole("searchbox", { name: /Search Term/i }),
      "react"
    );
    expect(setSearchTermMock).toHaveBeenCalledTimes(5);
  });

  test("has a class 'search-with-suggestions' if showSuggestions prop is true", () => {
    const classNoShowSuggestions = "search ";
    const classShowSuggestions = "search search-with-suggestions";

    const { rerender } = render(<Input showSuggestions={false} />);

    const input = screen.getByRole("searchbox", { name: /Search Term/i });
    expect(input).toHaveClass(classNoShowSuggestions);

    rerender(<Input showSuggestions={true} />);
    expect(input).toHaveClass(classShowSuggestions);
  });

  test("renders a search input without accessibility violations", async () => {
    const { container } = render(<Input />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
