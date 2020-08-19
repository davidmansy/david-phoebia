const packagesRoutes = require("./packages");
const versionsRoutes = require("./versions");

const appRouter = (app, fs) => {
  // default route here that handles empty routes at the base API url
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  packagesRoutes(app, fs);
  versionsRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;
