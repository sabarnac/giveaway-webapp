Usage:

```tsx
import Config from "./store/config/Config";
import Round from "./store/round/Round";
import Participant from "./store/round/match/participant/Participant";

const tournament: Tournament = new Tournament(Config.instance);
const firstRound: Round = tournament.firstRound; // Round("round-1")
const lastRound: Round = tournament.lastRound; // Round("round-x")
const rounds: Round[] = tournament.rounds; // [Round("round-1"), ..., Round("round-x")]
const rounds: Participant = tournament.winner; // Participant("winner")
```
