# The Giveaway Tournament App

Ever wanted to have a giveaway but didn't want to just randomly select a winner? Then just compile this app with a seed, a list of random messages to display for each match, and a list of users, and then just compile and host the generated files on a web server for everyone to see! The fixed seed ensures everyone sees the same results, while the Mersenne Twister engine ensures the random distribution of results is uniform!

![Desktop Preview](https://i.imgur.com/aosE6zt.gif)
![Mobile Preview](https://i.imgur.com/QBxyhl0.gif)

# Usage

1. Clone this repository.
2. Execute `npm i`.
3. Modify `src/config.json` with a seed value and a list of messages to show when a match is concluded.
    - `#winner` in the message gets replaced with the name of the winner.
    - `#loser` in the message gets replaced with the name of the loser.
4. Modify `src/users.json` with the list of names of the participants in the tournament.
5. Execute `npm run build:prod`.
6. Host the contents of the generated `dist` folder on your website's web server.

# Features

- Automatically selects a winner at random for each match.
- Constant seed value ensures same result is seen by every website user.
- Is built as a PWA web-app.
- Mandatory configuration is simple to do.

# Future Plans

- Make the application more customizable (with respect to what text is shown where).
- Further improve performance while not heavily impacting size.
- Improve code modularity.
- Add support for showing images for each participant, and showing images during winner selection in the modal.

# Development

Just follow the first 4 steps above, and then execute `npm run build:dev` which makes webpack compile and watch for changes. Run a server for the dist folder (may add a `server.js` file later to do that for you) and then start developing! 😄

# gh-pages branch (Do not modify)

The gh-pages branch is for hosting a sample website, and for hosting my own giveaway tournaments. All names in their are aliases. No pull-requests will be accepted for that branch.