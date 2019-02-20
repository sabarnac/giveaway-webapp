Usage:

```tsx
const speedMultiplier: number = AnimationSpeed.get("ONE"); // 1
const speedMultipliers: number[] = AnimationSpeed.getValues(); // [0.5, 1, 1.5, 2, 5, 10]
const speedKeys: string[] = AnimationSpeed.getKeys(); // ["HALF", "ONE", "ONE_POINT_FIVE", "TWO", "FIVE", "TEN"]
const hasKey1: boolean = AnimationSpeed.hasKey("ONE"); // true
const hasKey2: boolean = AnimationSpeed.hasKey("FOO"); // false
const hasValue1: boolean = AnimationSpeed.hasValue(1); // true
const hasValue2: boolean = AnimationSpeed.hasValue(1.25); // false
const speedEntries: [string, number][] = AnimationSpeed.getEntries(); //[["HALF", 0.5], ["ONE", 1], ["ONE_POINT_FIVE", 1.5], ["TWO", 2], ["FIVE", 5], ["TEN", 10], ["TWENTY", 20]]
```
