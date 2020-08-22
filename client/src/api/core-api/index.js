import { buildUrl } from "../../utils/utils";

const PACKAGE_URL = "/packages";
const VERSIONS_URL = "/package-history";

function handleFailedHttpResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

function handleFetchUrl(url) {
  return fetch(url)
    .then(handleFailedHttpResponse)
    .then((data) => data)
    .catch((error) => {
      console.warn(error);
      throw error;
    });
}

export function getPackages(searchValue) {
  const url = buildUrl(PACKAGE_URL, { q: searchValue });
  return handleFetchUrl(url);
}

export function getVersions(name, count, major) {
  const url = buildUrl(VERSIONS_URL, { name, count, major });
  return handleFetchUrl(url);
}
