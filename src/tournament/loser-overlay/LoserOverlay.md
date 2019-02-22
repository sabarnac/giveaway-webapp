Usage:

```tsx
import Participant from "./store/round/match/participant/Participant";

const losers: Participant[] = [new Participant("FOO BAR")];
<LoserOverlay
  losers={losers}
  onOverlayComplete={() => console.log("Loser Overlay Animation Completed!")}
/>;
```
