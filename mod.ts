import {
  Temporal,
  toTemporalInstant,
} from "https://esm.sh/@js-temporal/polyfill@0.4.4";

import { parse } from "./parse.ts";

declare global {
  interface Date {
    toTemporalInstant(this: Date): Temporal.Instant;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;

export function plainDateTime(input: string, format: string) {
  const parsed = parse(input, format);
  if (parsed.unixtime != undefined) {
    throw new Error("Unix Time parsing is not currently supported.");
  }

  let hour = parsed.hour;
  if (parsed.ampm) {
    if (12 < parsed.hour) {
      throw new TypeError(
        "You cannot specify AM or PM for times with hours greater than 12 hours.",
      );
    }

    // AM12時/PM12時対応
    if (parsed.ampm === "pm") {
      if (hour < 12) {
        hour += 12;
      }
    } else {
      if (hour == 12) {
        hour = 0;
      }
    }
  }
  return Temporal.PlainDateTime.from({
    year: parsed.year,
    month: parsed.month,
    day: parsed.day,
    hour: hour,
    minute: parsed.minute,
    second: parsed.second,
    millisecond: parsed.millisecond,
  });
}
