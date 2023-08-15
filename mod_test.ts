import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.198.0/assert/mod.ts";
import { parse } from "./mod.ts";

Deno.test(function parseTest() {
  {
    const res = parse("2001-12-10", "YYYY-MM-DD");
    assertEquals(res, {
      year: "2001",
      month: "12",
      day: "10",
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      ampm: undefined,
      unixtime: 0,
    });
  }
  assertThrows(() => {
    parse("aaaaaaa", "YYYY-MM-DD");
  });
});
