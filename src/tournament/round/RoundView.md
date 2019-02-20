Usage:

```tsx
import Config from "./store/config/Config";
import Round from "./store/round/Round";
import Participant from "./store/round/match/participant/Participant";

const round: Round = new Round(Config.instance, [
  new Participant("FOO"),
  new Participant("BAR")
]);
<RoundView
  matchId="match-1"
  round={round}
  onRoundComplete={() => console.log("Round View Animation Completed!")}
/>;
```
