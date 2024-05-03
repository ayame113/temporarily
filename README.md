# temporarily

Datetime parser for [Temporal API](https://tc39.es/proposal-temporal/docs/).

```ts
// main.ts
import { parse } from "./mod.ts";

const parsed = parse("2024-05-03 15:25:29", "%Y-%m-%d %H:%M:%S");
console.log(parsed); // { year: 2024, month: 5, day: 3, hour: 15, minute: 25, second: 29 }

const date = Temporal.PlainDateTime.from(parsed);
console.log(date); // Temporal { 2024-05-03T15:25:29 }
```

```shell
deno run --unstable-temporal ./main.ts
```
