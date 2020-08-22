import { getLastVersionsAndPreviousMajor } from "./index";
import { getVersions as getVersionsMock } from "./core-api/index";

jest.mock("./core-api/index");

afterEach(() => {
  getVersionsMock.mockClear();
});

describe("getLastVersionsAndPreviousMajor", () => {
  test("should return an empty object for a list of versions being all rc", async () => {
    const versions = {
      "17.0.0-rc.0": { name: "react", version: "17.0.0-rc.0" },
      "17.1.0-rc.0": { name: "react", version: "17.1.0-rc.0" },
      "17.2.0-rc.0": { name: "react", version: "17.2.0-rc.0" },
    };
    getVersionsMock.mockImplementationOnce(() => Promise.resolve(versions));
    const versionsArray = await getLastVersionsAndPreviousMajor("react");

    expect(versionsArray).toHaveLength(3);
    expect(versionsArray[2].version).toBe("17.2.0-rc.0");

    expect(getVersionsMock).toHaveBeenCalledTimes(1);
    expect(getVersionsMock.mock.calls[0][0]).toBe("react");
    expect(getVersionsMock.mock.calls[0][1]).toBe(3);
    expect(getVersionsMock.mock.calls[0][2]).toBe(undefined);
  });

  test("should return the last 3 versions if previousMajor already included", async () => {
    const versions = {
      "15.0.0.0": { name: "react", version: "15.0.0.0" },
      "16.0.0.0": { name: "react", version: "16.0.0.0" },
      "17.0.0.0": { name: "react", version: "17.0.0.0" },
    };
    getVersionsMock.mockImplementationOnce(() => Promise.resolve(versions));
    const versionsArray = await getLastVersionsAndPreviousMajor("react");

    expect(versionsArray).toHaveLength(3);
    expect(versionsArray[2].version).toBe("17.0.0.0");

    expect(getVersionsMock).toHaveBeenCalledTimes(1);
    expect(getVersionsMock.mock.calls[0][0]).toBe("react");
    expect(getVersionsMock.mock.calls[0][1]).toBe(3);
    expect(getVersionsMock.mock.calls[0][2]).toBe(undefined);
  });

  test("should return the last 3 versions + previousMajor if previousMajor exists", async () => {
    const versions = {
      "17.1.0.0": { name: "react", version: "17.1.0.0" },
      "17.2.0.0": { name: "react", version: "17.2.0.0" },
      "17.3.0.0": { name: "react", version: "17.3.0.0" },
    };
    const previousMajorVersion = {
      "16.8.0.0": { name: "react", version: "16.8.0.0" },
    };
    getVersionsMock
      .mockImplementationOnce(() => Promise.resolve(versions))
      .mockImplementationOnce(() => Promise.resolve(previousMajorVersion));
    const versionsArray = await getLastVersionsAndPreviousMajor("react");
    expect(versionsArray).toHaveLength(4);
    expect(versionsArray[0].version).toBe("16.8.0.0");

    expect(getVersionsMock).toHaveBeenCalledTimes(2);
    expect(getVersionsMock.mock.calls[0][0]).toBe("react");
    expect(getVersionsMock.mock.calls[0][1]).toBe(3);
    expect(getVersionsMock.mock.calls[0][2]).toBe(undefined);
    expect(getVersionsMock.mock.calls[1][0]).toBe("react");
    expect(getVersionsMock.mock.calls[1][1]).toBe(1);
    expect(getVersionsMock.mock.calls[1][2]).toBe(16);
  });

  test("should return the last 3 versions if previousMajor does not exist", async () => {
    const versions = {
      "17.1.0.0": { name: "react", version: "17.1.0.0" },
      "17.2.0.0": { name: "react", version: "17.2.0.0" },
      "17.3.0.0": { name: "react", version: "17.3.0.0" },
    };
    const previousMajorVersion = {};
    getVersionsMock
      .mockImplementationOnce(() => Promise.resolve(versions))
      .mockImplementationOnce(() => Promise.resolve(previousMajorVersion));
    const versionsArray = await getLastVersionsAndPreviousMajor("react");
    expect(versionsArray).toHaveLength(3);
    expect(versionsArray[0].version).toBe("17.1.0.0");

    expect(getVersionsMock).toHaveBeenCalledTimes(2);
    expect(getVersionsMock.mock.calls[0][0]).toBe("react");
    expect(getVersionsMock.mock.calls[0][1]).toBe(3);
    expect(getVersionsMock.mock.calls[0][2]).toBe(undefined);
    expect(getVersionsMock.mock.calls[1][0]).toBe("react");
    expect(getVersionsMock.mock.calls[1][1]).toBe(1);
    expect(getVersionsMock.mock.calls[1][2]).toBe(16);
  });

  test("should return the 1 version non-rc and existing previousMajor", async () => {
    const versions = {
      "15.9.0.0": { name: "react", version: "15.9.0.0" },
      "16.rc.0.0": { name: "react", version: "16.rc.0.0" },
      "17.rc.0.0": { name: "react", version: "17.rc.0.0" },
    };
    const previousMajorVersion = {
      "14.8.0.0": { name: "react", version: "14.8.0.0" },
    };
    getVersionsMock
      .mockImplementationOnce(() => Promise.resolve(versions))
      .mockImplementationOnce(() => Promise.resolve(previousMajorVersion));
    const versionsArray = await getLastVersionsAndPreviousMajor("react");

    expect(versionsArray).toHaveLength(4);
    expect(versionsArray[0].version).toBe("14.8.0.0");

    expect(getVersionsMock).toHaveBeenCalledTimes(2);
    expect(getVersionsMock.mock.calls[0][0]).toBe("react");
    expect(getVersionsMock.mock.calls[0][1]).toBe(3);
    expect(getVersionsMock.mock.calls[0][2]).toBe(undefined);
    expect(getVersionsMock.mock.calls[1][0]).toBe("react");
    expect(getVersionsMock.mock.calls[1][1]).toBe(1);
    expect(getVersionsMock.mock.calls[1][2]).toBe(14);
  });
});
