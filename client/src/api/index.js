import { buildUrl, buildArrayFromObject } from "../utils/utils";

const PACKAGE_URL = "/packages";
const VERSIONS_URL = "/package-history";
const RC = "rc";

function handleFailedHttpResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

export function getPreviousMajor(versionsKeys = []) {
  let previousMajor = null;
  let isPreviousMajorFound = false;
  for (let i = versionsKeys.length - 1; i >= 0; i--) {
    if (versionsKeys[i].length > 0 && !versionsKeys[i].includes(RC)) {
      const currentMajor = +versionsKeys[i].split(".")[0];
      if (!isPreviousMajorFound) {
        previousMajor = currentMajor - 1;
        isPreviousMajorFound = true;
      } else {
        if (currentMajor === previousMajor) {
          //if previousMajor already included, do not search for it
          return null;
        }
      }
    }
  }
  return previousMajor;
}

function addPreviousMajorToVersions(name, versions, previousMajor) {
  return getVersions(name, 1, previousMajor).then((version) => {
    return Object.keys(version).length ? { ...version, ...versions } : versions;
  });
}

export function getPackages(searchValue) {
  const url = buildUrl(PACKAGE_URL, { q: searchValue });
  return fetch(url)
    .then(handleFailedHttpResponse)
    .then((packages) => packages)
    .catch((error) => {
      console.warn(error);
      return [];
    });
}

export function getVersions(name, count, major) {
  const url = buildUrl(VERSIONS_URL, { name, count, major });
  return fetch(url)
    .then(handleFailedHttpResponse)
    .then((versions) => versions)
    .catch((error) => {
      console.warn(error);
      return {};
    });
}

export function getLastVersionsAndPreviousMajor(name) {
  return getVersions(name, 3)
    .then((versions) => {
      const previousMajor = getPreviousMajor(Object.keys(versions));
      return [versions, previousMajor];
    })
    .then(([versions, previousMajor]) => {
      return previousMajor
        ? addPreviousMajorToVersions(name, versions, previousMajor)
        : versions;
    })
    .then((versions) => buildArrayFromObject(Object.keys(versions), versions))
    .then((versionsArray) =>
      //Remove version objects without any data
      versionsArray.filter((version) => Object.keys(version).length > 0)
    )
    .catch((error) => {
      console.warn(error);
      return [];
    });
}
