# The Giveaway Tournament App [![Build Status](https://travis-ci.org/sabarnac/giveaway-webapp.svg)](https://travis-ci.org/sabarnac/giveaway-webapp)

Ever wanted to have a giveaway but didn't want to just randomly select a winner? Then just compile this app with a seed, a list of random messages to display for each match, and a list of users, and then just compile and host the generated files on a web server for everyone to see! The fixed seed ensures everyone sees the same results, while the Mersenne Twister engine ensures the random distribution of results is uniform!

<p align="center">
<img alt="Desktop Preview" src="https://i.imgur.com/kFENmiH.gif" />
</p>
<p align="center">
<img alt="Mobile Preview" src="https://i.imgur.com/w9A3ipY.gif" />
</p>

# Usage

1. Clone this repository.
2. Execute `npm install`.
3. Modify `src/store/config/config.json` with the tournament name, a seed value, the number of participants per match, a list of match conclusion messages, and the list of participants.
   - `#winner` in the message gets replaced with the name of the winner.
   - `#loser` in the message gets replaced with the name of the loser(s).
   - A participant can just be a name, or a JSON object `{ name: "string", avatar: { url: "string", altText: "string" } }` (`avatar` property is optional).
4. Use it as a standard React application created through `create-react-app` using TypeScript, `MobX` for state management, with `sw-precache-cra`, `gh-pages`, and `react-styleguidist`.

# Features

- Automatically selects a winner at random for each match.
- Constant seed value ensures same result is seen by every website user.
- Is a PWA.
- Simple configuration.
- Can start from any round and/or match, with the ability to pause at a particular match.

# Future Plans

- Make the application more customizable (with respect to what text is shown where).
- Add support for weights on participants.

# Development

Just follow the first 3 steps in the `Usage` section, and as mentioned, use it as a standard React application, and start developing! 😄

### gh-pages branch (Do not modify)

That was it. It's for hosting a sample website, docs generated through `react-styleguidist`, and my own giveaways.
