Assume the configuration in `src/config/config.json` is set as:

```json
{
  "name": "Foobar Giveaway",
  "seed": 1234567890,
  "participantsPerMatch": 2,
  "messages": [
    "#winner #loser 1",
    "#winner #loser 2",
    "#winner #loser 3",
    "#winner #loser 4"
  ],
  "users": ["FOO", "BAR", "FAZ"]
}
```

Usage:

```tsx
import AnimationSpeed from "./store/config/AnimationSpeed";
import Participant from "./store/round/match/participant/Participant";

const name: string = Config.name; // "Foobar Giveaway
const messages: string[] = Config.messages; // ["#winner #loser 1", "#winner #loser 2", "#winner #loser 3", "#winner #loser 4"]
const message: string = Config.getRandomMessage("foobar", ["barfoo"]); // "foobar barfoo 3"
const allParticipants: Participant[] = Config.allParticipants; // [Participant("FOO"), Participant("BAR"), Participant("FAZ")]
const participantsPerMatch: number = Config.participantsPerMatch; // 2
const speed: number = Config.speed; // 1
Config.setSpeed(AnimationSpeed.TWO);
```
