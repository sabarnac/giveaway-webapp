Usage:

```tsx
import Participant from "./store/round/match/participant/Participant";

const match: Match = new Match([
  new Participant("FOO"),
  new Participant("BAR")
]);
const matchId: Round = match.id; // "match-1"
const participants: Participant[] = round.participants; // [Participant("FOO"), Participant("BAR")]
const losers: Participant[] = round.losers; // [Participant("BAR")]
const winner: Participant[] = round.winner; // Participant("FOO")
```
