Usage:

```tsx
import Participant from "./store/round/match/participant/Participant";
import createParticipantView from "./";

const participant: Participant = new Participant("FOO");
const ParticipantFoobarView = createParticipantView("foobar");
<ParticipantFoobarView participant={participant} inverse={false} />;
```
