const utils = require("../utils/utils");

function filterVersions(versions, count, major) {
  let versionsKeys = Object.keys(versions);

  if (major) {
    versionsKeys = versionsKeys.filter(
      (version) => version.split(".")[0] === major
    );
  }

  return count && count > 0 ? versionsKeys.slice(-count) : versionsKeys;
}

function sendSelectedData(data, { name, count, major }, res) {
  const versions = data[name] || {};
  const filteredVersionsKeys = filterVersions(versions, count, major);

  const arrayOfVersions = res.send(
    utils.buildArrayFromObject(filteredVersionsKeys, versions)
  );
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
