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

## supported formats

- `%Y`: year (e.g. 2024)
- `%m`: month, zero-padded to 2 digits (e.g. 05)
- `%-m`: month (e.g. 5)
- `%d`: day, zero-padded to 2 digits (e.g. 03)
- `%-d`: day (e.g. 3)
- `%H`: hour, zero-padded to 2 digits (e.g. 09)
- `%-H`: hour (e.g. 9)
- `%I`: hour in 12-hour clocks, zero-padded to 2 digits (e.g. 03)
- `-%I`: hour in 12-hour clocks (e.g. 3)
- `%p`: AM/PM (e.g. PM)
- `%P`: am/pm (e.g. pm)
- `%M`: minute, zero-padded to 2 digits (e.g. 25)
- `%-M`: minute (e.g. 25)
- `%S`: second, zero-padded to 2 digits (e.g. 29)
- `%-S`: second (e.g. 29)
- `%%`: `%`

This library's format strings are based on the Rust library
[chrono](https://docs.rs/chrono/latest/chrono/format/strftime/index.html). Some
other formats included in chrono are also supported.
