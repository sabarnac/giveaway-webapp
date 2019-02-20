Usage:

```tsx
import Match from "./store/round/match/Match";
import Participant from "./store/round/match/participant/Participant";

const match: Match = new Match([
  new Participant("FOO"),
  new Participant("BAR")
]);
<MatchOverlay
  currentMatch={match}
  onMatchComplete={() => console.log("Match Overlay Animation Completed!")}
/>;
```
