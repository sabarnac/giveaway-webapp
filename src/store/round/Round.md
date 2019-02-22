Usage:

```tsx
import Match from "./store/round/match/Match";
import Participant from "./store/round/match/participant/Participant";

const round: Round = new Round(Config.instance, [
  new Participant("FOO"),
  new Participant("BAR")
]);
const roundId: Round = round.id; // "round-1"
const matches: Match[] = round.matches; // [Match("match-1"), ..., Match("match-x")]
const firstMatch: Match = round.firstMatch; // Match("match-1")
const lastMatch: Match = round.lastMatch; // Match("match-x")
const participants: Participant[] = round.participants; // [Participant("FOO"), Participant("BAR")]
const winners: Participant[] = round.winners; // [Participant("FOO")]
const losers: Participant[] = round.losers; // [Participant("BAR")]
```
