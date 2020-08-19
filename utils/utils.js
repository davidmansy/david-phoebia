function filterObjectUsingKeys(keys, rawObject) {
  return keys.length === Object.keys(rawObject)
    ? rawObject
    : keys.reduce((obj, key) => {
        obj[key] = rawObject[key];
        return obj;
      }, {});
}

exports.filterObject = filterObjectUsingKeys;
