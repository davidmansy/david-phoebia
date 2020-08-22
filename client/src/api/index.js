import { getVersions } from "./core-api/index";

const RC = "rc";
const COUNT_THREE = 3;
const COUNT_ONE = 1;

function getMajorOfVersion(version) {
  return Number(version.split(".")[0]);
}

function filterEmptyAndRCVersions(versions) {
  return Object.keys(versions).filter((v) => v.length > 0 && !v.includes(RC));
}

function getPreviousMajor(versions) {
  const versionsKeys = filterEmptyAndRCVersions(versions);

  if (versionsKeys.length === 0) return null;

  const lastVersionKey = versionsKeys[versionsKeys.length - 1];
  const previousMajor = getMajorOfVersion(lastVersionKey) - 1;

  return versionsKeys.some(
    (version) => getMajorOfVersion(version) === previousMajor
  )
    ? null
    : previousMajor;
}

async function addPreviousMajorVersion(name, versions, previousMajor) {
  try {
    const version = previousMajor
      ? await getVersions(name, COUNT_ONE, previousMajor)
      : {};
    return { ...version, ...versions };
  } catch (error) {
    console.warn(error);
    throw error;
  }
}

function filterEmptyObjects(versionsArray) {
  return versionsArray.filter((version) => Object.keys(version).length > 0);
}

export async function getLastVersionsAndPreviousMajor(name) {
  try {
    const lastVersions = await getVersions(name, COUNT_THREE);
    const previousMajor = getPreviousMajor(lastVersions);
    const lastVersionsAndPreviousMajor = await addPreviousMajorVersion(
      name,
      lastVersions,
      previousMajor
    );
    return filterEmptyObjects(Object.values(lastVersionsAndPreviousMajor));
  } catch (error) {
    console.warn(error);
    throw error;
  }
}
