const utils = require("../utils/utils");

function filterVersionsByMajor({ versionsKeys, count, major }) {
  if (major)
    versionsKeys = versionsKeys.filter(
      (version) => version.split(".")[0] === major
    );
  return { versionsKeys, count, major };
}

function filterVersionsByCount({ versionsKeys, count, major }) {
  if (count && count > 0) {
    versionsKeys = versionsKeys.slice(-count);
  }
  return { versionsKeys, count, major };
}

function filterVersionsKeys(versionsKeys, count, major) {
  return utils.compose(
    filterVersionsByCount,
    filterVersionsByMajor
  )({
    versionsKeys,
    count,
    major,
  });
}

function sendSelectedData(data, { name, count, major }, res) {
  const versions = data[name] || {};
  const { versionsKeys: filteredVersionsKeys } = filterVersionsKeys(
    Object.keys(versions),
    count,
    major
  );

  res.send(utils.filterObjectUsingKeys(filteredVersionsKeys, versions));
}

const versionsRoutes = (app, fs) => {
  const dataPath = "./data/versions.json";
  let data;

  app.get("/package-history", (req, res) => {
    if (data) {
      sendSelectedData(data, req.query, res);
      return;
    }

    fs.readFile(dataPath, "utf8", (err, json) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(json);
      sendSelectedData(data, req.query, res);
    });
  });
};

module.exports = versionsRoutes;
