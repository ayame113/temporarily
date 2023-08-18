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

Deno.test({
  name: "plainDateTime - AM/PM",
  fn() {
    assertEquals(plainDateTime("00 AM", "HH A").hour, 0);
    assertEquals(plainDateTime("01 AM", "HH A").hour, 1);
    assertEquals(plainDateTime("02 AM", "HH A").hour, 2);
    assertEquals(plainDateTime("03 AM", "HH A").hour, 3);
    assertEquals(plainDateTime("04 AM", "HH A").hour, 4);
    assertEquals(plainDateTime("05 AM", "HH A").hour, 5);
    assertEquals(plainDateTime("06 AM", "HH A").hour, 6);
    assertEquals(plainDateTime("07 AM", "HH A").hour, 7);
    assertEquals(plainDateTime("08 AM", "HH A").hour, 8);
    assertEquals(plainDateTime("09 AM", "HH A").hour, 9);
    assertEquals(plainDateTime("10 AM", "HH A").hour, 10);
    assertEquals(plainDateTime("11 AM", "HH A").hour, 11);
    assertEquals(plainDateTime("12 AM", "HH A").hour, 0);

    assertEquals(plainDateTime("00 PM", "HH A").hour, 12);
    assertEquals(plainDateTime("01 PM", "HH A").hour, 13);
    assertEquals(plainDateTime("02 PM", "HH A").hour, 14);
    assertEquals(plainDateTime("03 PM", "HH A").hour, 15);
    assertEquals(plainDateTime("04 PM", "HH A").hour, 16);
    assertEquals(plainDateTime("05 PM", "HH A").hour, 17);
    assertEquals(plainDateTime("06 PM", "HH A").hour, 18);
    assertEquals(plainDateTime("07 PM", "HH A").hour, 19);
    assertEquals(plainDateTime("08 PM", "HH A").hour, 20);
    assertEquals(plainDateTime("09 PM", "HH A").hour, 21);
    assertEquals(plainDateTime("10 PM", "HH A").hour, 22);
    assertEquals(plainDateTime("11 PM", "HH A").hour, 23);
    assertEquals(plainDateTime("12 PM", "HH A").hour, 12);
  },
});
