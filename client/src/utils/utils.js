export function buildUrl(uri, params) {
  const query = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== null)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  return `${uri}?${query}`;
}

export function buildArrayFromObject(keys, rawObject) {
  return keys.reduce((arr, key) => {
    arr.push(rawObject[key]);
    return arr;
  }, []);
}
