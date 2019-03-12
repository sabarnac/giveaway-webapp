Usage:

```tsx
import Participant from "./store/round/match/participant/Participant";

const match: Match = new Match(
  [new Participant("FOO"), new Participant("BAR")],
  "1",
);
const matchId: string = match.id; // "1"
const matchCompleteId: string = match.fullId; // "1:1"
const participants: Participant[] = round.participants; // [Participant("FOO"), Participant("BAR")]
const losers: Participant[] = round.losers; // [Participant("BAR")]
const winner: Participant[] = round.winner; // Participant("FOO")
```
