import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PackageSearch from "./index";
import { getPackages as mockGetPackages } from "../../api/core-api/index";
import { axe } from "jest-axe";

const VERSION_SEPARATOR = "@";
const packages = [
  {
    package: {
      name: "react-re-super-tabs",
      version: "1.1.0",
    },
  },
  {
    package: {
      name: "react-redux",
      version: "7.2.1",
    },
  },
  {
    package: {
      name: "react",
      version: "16.13.1",
    },
  },
  {
    package: {
      name: "react-native-re-slider",
      version: "2.0.0",
    },
  },
  {
    package: {
      name: "react-dom",
      version: "16.13.1",
    },
  },
  {
    package: {
      name: "react-is",
      version: "16.13.1",
    },
  },
  {
    package: {
      name: "react-test-renderer",
      version: "16.13.1",
    },
  },
];

jest.mock("../../api/core-api/index");

describe("My PackageSearch component", () => {
  test("renders a list of suggested packages fetched using input value", async () => {
    mockGetPackages.mockImplementationOnce(() => Promise.resolve(packages));
    render(<PackageSearch />);

    await userEvent.type(
      screen.getByRole("searchbox", { name: /Search Term/i }),
      "react"
    );
    const suggestionsLi = await screen.findAllByRole("listitem");

    expect(suggestionsLi).toHaveLength(packages.length);
    expect(suggestionsLi[1]).toHaveTextContent("react-redux");
  });

  test("renders an error message when API down", async () => {
    mockGetPackages.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<PackageSearch />);

    await userEvent.type(
      screen.getByRole("searchbox", { name: /Search Term/i }),
      "react"
    );
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });

  test("renders no suggested packages if input value includes version separator", async () => {
    mockGetPackages.mockImplementationOnce(() => Promise.resolve(packages));
    render(<PackageSearch />);

    await userEvent.type(
      screen.getByRole("searchbox", { name: /Search Term/i }),
      "react"
    );
    const suggestionsLi = await screen.findAllByRole("listitem");
    expect(suggestionsLi).toHaveLength(packages.length);

    await userEvent.type(
      screen.getByRole("searchbox", { name: /Search Term/i }),
      `react${VERSION_SEPARATOR}17.0.0`
    );
    await waitForElementToBeRemoved(() => screen.queryAllByRole("listitem"));
  });

  test("calls the setSelectedPackage function (from props) when a list item is clicked", async () => {
    mockGetPackages.mockImplementationOnce(() => Promise.resolve(packages));
    const setSelectedPackageMock = jest.fn();
    render(<PackageSearch setSelectedPackage={setSelectedPackageMock} />);

    await userEvent.type(
      screen.getByRole("searchbox", { name: /Search Term/i }),
      "react"
    );
    const suggestionsLi = await screen.findAllByRole("listitem");

    fireEvent.click(suggestionsLi[1]);
    expect(setSelectedPackageMock).toHaveBeenCalledTimes(1);
    expect(setSelectedPackageMock).toHaveBeenCalledWith({
      name: "react-redux",
      version: "7.2.1",
    });
  });

  test("renders a list of suggested package without accessibility violations", async () => {
    const { container } = render(<PackageSearch />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
