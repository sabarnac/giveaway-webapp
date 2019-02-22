Usage:

```tsx
import Match from "./store/round/match/Match";
import Participant from "./store/round/match/participant/Participant";

const match: Match = new Match([
  new Participant("FOO"),
  new Participant("BAR")
]);
<MatchView
  match={match}
  isCurrentMatch={true}
  onMatchComplete={() => console.log("Match View Animation Completed!")}
/>;
```
