import React from "react";
import { render, screen } from "@testing-library/react";
import PackageDetail from "./index";
import { getLastVersionsAndPreviousMajor as mockgetLastVersionsAndPreviousMajor } from "../../api/index";
import { axe } from "jest-axe";

const versions = [
  {
    name: "react",
    version: "16.13.0",
    size: 6445,
    gzip: 2621,
  },
  {
    name: "react",
    version: "16.13.1",
    size: 6449,
    gzip: 2624,
  },
  {
    name: "react",
    version: "17.0.0-rc.0",
    size: 2583,
    gzip: 6212,
  },
];

const selectedPackage = { name: "react", version: "16.13.1" };

jest.mock("../../api/index");

describe("My PackageDetail component", () => {
  test("renders data of the current version of the selected package and stats on last versions", async () => {
    mockgetLastVersionsAndPreviousMajor.mockImplementationOnce(() =>
      Promise.resolve(versions)
    );

    render(<PackageDetail selectedPackage={selectedPackage} />);

    expect(await screen.findByText(/6449/i));
    expect(screen.getByText(/16.13.0/i));
    expect(screen.getAllByText(/16.13.1/i)).toHaveLength(2);
    expect(screen.getByText(/17.0.0-rc.0/i));

    expect(mockgetLastVersionsAndPreviousMajor).toHaveBeenCalledTimes(1);
    expect(mockgetLastVersionsAndPreviousMajor).toHaveBeenCalledWith("react");
  });

  test("renders an error message when API down", async () => {
    mockgetLastVersionsAndPreviousMajor.mockImplementationOnce(() =>
      Promise.reject(new Error())
    );
    render(<PackageDetail selectedPackage={selectedPackage} />);

    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });

  test("renders nothing if no selected package", async () => {
    render(<PackageDetail />);
    expect(screen.queryByText(/loader.svg/i)).toBeNull();
    expect(screen.queryByText(/6449/i)).toBeNull();
  });

  test("renders a list of versions without accessibility violations", async () => {
    mockgetLastVersionsAndPreviousMajor.mockImplementationOnce(() =>
      Promise.resolve(versions)
    );
    const { container } = render(
      <PackageDetail selectedPackage={selectedPackage} />
    );

    expect(await screen.findByText(/6449/i));

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
