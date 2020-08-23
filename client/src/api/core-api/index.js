import { buildUrl } from "../../utils/utils";

let host;

if (process.env.NODE_ENV === "development") {
  host = "/";
}

if (process.env.NODE_ENV === "production") {
  host =
    "https://us-central1-david-phoebia-server.cloudfunctions.net/davidPhoebia/";
}

const PACKAGE_URI = "packages";
const VERSIONS_URI = "package-history";

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
  const url = buildUrl(`${host}${PACKAGE_URI}`, { q: searchValue });
  return handleFetchUrl(url);
}

export function getVersions(name, count, major) {
  const url = buildUrl(`${host}${VERSIONS_URI}`, { name, count, major });
  return handleFetchUrl(url);
}
