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

function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

exports.filterObjectUsingKeys = filterObjectUsingKeys;
exports.buildArrayFromObject = buildArrayFromObject;
exports.compose = compose;
