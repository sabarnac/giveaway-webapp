Usage:

```tsx
import Avatar from "./store/round/match/participant/Avatar";

const participant: Participant = new Participant(
  "FOO BAR" /*, {url:"url",altText:"alt-text"} */
);
const participantName: string = participant.name; // "FOO BAR"
const participantProperName: string = participant.properName; // "Foo Bar"
const participantAvatar: Avatar = participant.avatar; // Avatar("url","alt-text")
```
