Usage:

```tsx
import Config from "./store/config/Config";
import Tournament from "./store/Tournament";

const tournament: Tournament = new Tournament(Config.instance);
<AppRouter tournament={tournament} />;
```
