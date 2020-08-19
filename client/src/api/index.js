const PACKAGE_URL = "/packages";
const VERSIONS_URL = "/package-history";

function buildUrl(uri, params) {
  const query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  return `${uri}?${query}`;
}

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
      return [];
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
