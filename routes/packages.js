const querystring = require("querystring");

function findMatches(wordToMatch, npmPackages) {
  return !wordToMatch
    ? npmPackages
    : npmPackages.filter((npmPackage) => {
        const regex = new RegExp(wordToMatch, "gi");
        return npmPackage.package.name.match(regex);
      });
}

const packagesRoutes = (app, fs) => {
  const dataPath = "./data/packages.json";

  app.get("/packages", (req, res) => {
    const searchString = req.query.q;

    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      const matchedNpmPackages = findMatches(searchString, JSON.parse(data));
      res.send(matchedNpmPackages);
    });
  });
};

module.exports = packagesRoutes;
