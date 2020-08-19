function filterObjectUsingKeys(keys, rawObject) {
  return keys.length === Object.keys(rawObject)
    ? rawObject
    : keys.reduce((obj, key) => {
        obj[key] = rawObject[key];
        return obj;
      }, {});
}

function buildArrayFromObject(keys, rawObject) {
  return keys.reduce((arr, key) => {
    arr.push(rawObject[key]);
    return arr;
  }, []);
}

exports.filterObjectUsingKeys = filterObjectUsingKeys;
exports.buildArrayFromObject = buildArrayFromObject;
