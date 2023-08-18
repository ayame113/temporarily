import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { plainDateTime } from "./mod.ts";

Deno.test({
  name: "plainDateTime",
  fn() {
    const date = plainDateTime("2023-10-16 04:32:29", "YYYY-MM-DD HH:mm:ss");

    assertEquals(date.year, 2023);
    assertEquals(date.month, 10);
    assertEquals(date.day, 16);
    assertEquals(date.hour, 4);
    assertEquals(date.minute, 32);
    assertEquals(date.second, 29);
    assertEquals(date.millisecond, 0);
    assertEquals(date.microsecond, 0);
    assertEquals(date.nanosecond, 0);
  },
});
