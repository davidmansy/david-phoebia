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
  let data;

  app.get("/packages", (req, res) => {
    const searchString = req.query.q;
    if (data) {
      res.send(findMatches(searchString, data));
      return;
    }

    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      res.send(findMatches(searchString, data));
    });
  });
};

module.exports = packagesRoutes;
