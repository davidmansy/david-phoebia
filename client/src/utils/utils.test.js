import { buildUrl, buildArrayFromObject } from "./utils";

describe("buildUrl", () => {
  it(`should return a url without parameters when no params`, () => {
    const uri = "http://www.test.com";
    expect(buildUrl(uri, {})).toBe("http://www.test.com?");
  });

  it(`should return a url without parameters when one undefined param`, () => {
    const uri = "http://www.test.com";
    const params = {
      param1: undefined,
    };
    expect(buildUrl(uri, params)).toBe("http://www.test.com?");
  });

  it(`should return a url with one parameter`, () => {
    const uri = "http://www.test.com";
    const params = {
      param1: "value1",
    };
    expect(buildUrl(uri, params)).toBe("http://www.test.com?param1=value1");
  });

  it(`should return a url with multiple parameters`, () => {
    const uri = "http://www.test.com";
    const params = {
      param1: "value1",
      param2: "value2",
    };
    expect(buildUrl(uri, params)).toBe(
      "http://www.test.com?param1=value1&param2=value2"
    );
  });
});

describe("buildArrayFromObject", () => {
  it(`should build an array from an object using the provided keys`, () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    const keys = ["key1", "key2"];
    const expected = ["value1", "value2"];
    expect(buildArrayFromObject(keys, obj)).toEqual(expected);
  });
});
