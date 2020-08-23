# david-phoebia

Web app enabling to fetch the bundle sizes of npm packages and compare versions

# Installation and run

From the terminal

- In the root folder, run npm install, then npm start
- In the client folder, run yarn install, then yarn start
- In your browser, open https://localhost:3000 and enjoy!
- Watch out to get results, you need to enter at least 're' in the search field...Mocked data.
- The app is available hosted using Firebase [here](https://david-phoebia-client.web.app/), this app hosted on firebase connects to a server hosted as well on firebase using Cloud Functions (the server code of this repo was modified to work with Cloud Functions, check this repo [here](https://github.com/davidmansy/david-phoebia-server)).

# Client unit tests

From the terminal

- In the client folder, run yarn test

# Client e2e tests

From the terminal

- In the root folder, run npm start
- In the client folder, run yarn test:e2e (will start the dev server and run cypress)

# UI

React app with a design extremely inspired of bundle-phoebia.

# Back-end

Node express basic server serving data from json files
