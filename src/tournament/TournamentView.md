Usage:

```tsx
import Config from "./store/config/Config";
import Tournament from "./store/Tournament";

const tournament: Tournament = new Tournament(Config.instance);
<TournamentView roundId="round-1" matchId="match-1" tournament={tournament} />;
```
