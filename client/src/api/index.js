const PACKAGE_URL = "/packages";

function buildUrl(uri, params) {
  // Not using URL and URLSearchParams as I use "proxy" in package.json
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

export function getPackages(searchValue) {
  const url = buildUrl(PACKAGE_URL, { q: searchValue });

  return fetch(url)
    .then(handleFailedHttpResponse)
    .then((npmPackages) => npmPackages)
    .catch((error) => {
      console.warn(error);
      return [];
    });
}
