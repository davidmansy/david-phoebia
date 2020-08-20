import { getPreviousMajor } from "./index";

describe("getPreviousMajor", () => {
  it(`should return undefined for an empty list of versions keys`, () => {
    expect(getPreviousMajor([])).toBeNull();
  });

  it(`should return undefined for a list of rc only keys`, () => {
    const keys = ["15.0.0-rc.0", "16.0.0-rc.0", "17.0.0-rc.0"];
    expect(getPreviousMajor(keys)).toBeNull();
  });

  it(`should return undefined for a list of rc only keys`, () => {
    const keys = ["15.0.0-rc.0", "16.0.0-rc.0", "17.0.0-rc.0"];
    expect(getPreviousMajor(keys)).toBeNull();
  });

  it(`should return the previous version compared to the major of the first item not rc`, () => {
    const keys = ["15.0.0-rc.0", "16.0.0.0", "17.0.0-rc.0"];
    expect(getPreviousMajor(keys)).toBe(15);
  });

  it(`should return null if previous major already included`, () => {
    const keys = ["15.0.0.0", "16.0.0.0", "17.0.0.0"];
    expect(getPreviousMajor(keys)).toBeNull();
  });
});
