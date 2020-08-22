import React from "react";
import { render, screen, act } from "@testing-library/react";
import useDebounce from "./index";

jest.useFakeTimers();

describe("My custom hook useDebounce", () => {
  test("exposes a new value (received as props) after the wait time", async () => {
    let result = "";
    function TestComponent({ value }) {
      result = useDebounce(value, 500);
      return <p>{result}</p>;
    }

    const { rerender, getByText } = render(<TestComponent value="re" />);
    expect(getByText("re"));

    rerender(<TestComponent value="rea" />);
    expect(getByText("re"));
    expect(screen.queryByText("rea")).toBeNull();

    rerender(<TestComponent value="reac" />);
    expect(getByText("re"));
    expect(screen.queryByText("reac")).toBeNull();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(getByText("reac"));
  });
});
