import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.198.0/assert/mod.ts";
import { parse } from "./parse.ts";

Deno.test({
  name: "parser",
  fn() {
    assertEquals(parse("2001-12-10 10:21", "YYYY-MM-DD HH:mm"), {
      year: 2001,
      month: 12,
      day: 10,
      hour: 10,
      minute: 21,
      second: 0,
      nanosecond: 0,
      ampm: undefined,
      unixtime: undefined,
    });

    assertEquals(parse("([2001-12-10])\\", "([YYYY-MM-DD])\\"), {
      year: 2001,
      month: 12,
      day: 10,
      hour: 0,
      minute: 0,
      second: 0,
      nanosecond: 0,
      ampm: undefined,
      unixtime: undefined,
    });
  },
});

Deno.test({
  name: "parser - default value",
  fn() {
    assertEquals(parse("", ""), {
      year: 0,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      nanosecond: 0,
      ampm: undefined,
      unixtime: undefined,
    });
  },
});

const test = {
  year: {
    valid: range(-2000, 3000),
    invalid: ["aaaaa"],
    formats: {
      "%Y": { zeroPadding: true, noPadding: true, spacePadding: true },
      "%0Y": { zeroPadding: true, noPadding: false, spacePadding: false },
      "%-Y": { zeroPadding: false, noPadding: true, spacePadding: false },
      "%_Y": { zeroPadding: false, noPadding: false, spacePadding: true },
    },
    padTo: 4,
  },
} as const;

for (const [target, testCases] of Object.entries(test)) {
  for (const [format, formatTypes] of Object.entries(testCases.formats)) {
    for (const number of testCases.valid) {
      const targetString = {
        noPadding: number.toString(),
        zeroPadding: number < 0
          ? "-" +
            (-number).toString().padStart(testCases.padTo, "0")
          : number.toString().padStart(testCases.padTo, "0"),
        spacePadding: number.toString().padStart(testCases.padTo, " "),
      };
      const valids = new Set<string>();
      const invalids = new Set<string>(Object.values(targetString));
      for (
        const type of ["noPadding", "zeroPadding", "spacePadding"] as const
      ) {
        if (formatTypes[type]) {
          valids.add(targetString[type]);
          invalids.delete(targetString[type]);
        }
      }
      for (const validString of valids) {
        Deno.test({
          name: `${target} ${format} "${validString}" (valid)`,
          fn() {
            assertEquals(
              parse(validString, format)[target as keyof typeof test],
              number,
            );
          },
        });
      }
      for (const invalidString of invalids) {
        Deno.test({
          name: `${target} ${format} "${invalidString}" (invalid)`,
          fn() {
            assertThrows(
              () => parse(invalidString, format)[target as keyof typeof test],
              TypeError,
            );
          },
        });
      }
    }
  }
}

function range(from: number, to: number) {
  const res = [];
  for (let i = from; i <= to; i++) {
    res.push(i);
  }
  return res;
}

// Deno.test({
//   name: "parser - YYYY",
//   fn() {
//     assertEquals(parse("0000", "YYYY").year, 0); // allow 0year
//     assertEquals(parse("1999", "YYYY").year, 1999);
//     assertEquals(parse("2001", "YYYY").year, 2001);
//     assertThrows(() => parse("1", "YYYY"), TypeError);
//     assertThrows(() => parse("111", "YYYY"), TypeError);
//     assertThrows(() => parse("aaaa", "YYYY"), TypeError);
//     assertThrows(() => parse("11111", "YYYY"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - MM",
//   fn() {
//     assertEquals(parse("01", "MM").month, 1);
//     assertEquals(parse("02", "MM").month, 2);
//     assertEquals(parse("03", "MM").month, 3);
//     assertEquals(parse("04", "MM").month, 4);
//     assertEquals(parse("05", "MM").month, 5);
//     assertEquals(parse("06", "MM").month, 6);
//     assertEquals(parse("07", "MM").month, 7);
//     assertEquals(parse("08", "MM").month, 8);
//     assertEquals(parse("09", "MM").month, 9);
//     assertEquals(parse("10", "MM").month, 10);
//     assertEquals(parse("11", "MM").month, 11);
//     assertEquals(parse("12", "MM").month, 12);
//     assertThrows(() => parse("00", "MM"), TypeError);
//     assertThrows(() => parse("0", "MM"), TypeError);
//     assertThrows(() => parse("1", "MM"), TypeError);
//     assertThrows(() => parse("13", "MM"), TypeError);
//     assertThrows(() => parse("111", "MM"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - M",
//   fn() {
//     assertEquals(parse("1", "M").month, 1);
//     assertEquals(parse("2", "M").month, 2);
//     assertEquals(parse("3", "M").month, 3);
//     assertEquals(parse("4", "M").month, 4);
//     assertEquals(parse("5", "M").month, 5);
//     assertEquals(parse("6", "M").month, 6);
//     assertEquals(parse("7", "M").month, 7);
//     assertEquals(parse("8", "M").month, 8);
//     assertEquals(parse("9", "M").month, 9);
//     assertEquals(parse("10", "M").month, 10);
//     assertEquals(parse("11", "M").month, 11);
//     assertEquals(parse("12", "M").month, 12);
//     assertThrows(() => parse("00", "M"), TypeError);
//     assertThrows(() => parse("01", "M"), TypeError);
//     assertThrows(() => parse("09", "M"), TypeError);
//     assertThrows(() => parse("0", "M"), TypeError);
//     assertThrows(() => parse("13", "M"), TypeError);
//     assertThrows(() => parse("111", "M"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - DD",
//   fn() {
//     assertEquals(parse("01", "DD").day, 1);
//     assertEquals(parse("02", "DD").day, 2);
//     assertEquals(parse("03", "DD").day, 3);
//     assertEquals(parse("04", "DD").day, 4);
//     assertEquals(parse("05", "DD").day, 5);
//     assertEquals(parse("06", "DD").day, 6);
//     assertEquals(parse("07", "DD").day, 7);
//     assertEquals(parse("08", "DD").day, 8);
//     assertEquals(parse("09", "DD").day, 9);
//     assertEquals(parse("10", "DD").day, 10);
//     assertEquals(parse("30", "DD").day, 30);
//     assertEquals(parse("31", "DD").day, 31);
//     assertThrows(() => parse("00", "DD"), TypeError);
//     assertThrows(() => parse("32", "DD"), TypeError);
//     assertThrows(() => parse("0", "DD"), TypeError);
//     assertThrows(() => parse("1", "DD"), TypeError);
//     assertThrows(() => parse("111", "DD"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - D",
//   fn() {
//     assertEquals(parse("1", "D").day, 1);
//     assertEquals(parse("2", "D").day, 2);
//     assertEquals(parse("3", "D").day, 3);
//     assertEquals(parse("4", "D").day, 4);
//     assertEquals(parse("5", "D").day, 5);
//     assertEquals(parse("6", "D").day, 6);
//     assertEquals(parse("7", "D").day, 7);
//     assertEquals(parse("8", "D").day, 8);
//     assertEquals(parse("9", "D").day, 9);
//     assertEquals(parse("10", "D").day, 10);
//     assertEquals(parse("30", "D").day, 30);
//     assertEquals(parse("31", "D").day, 31);
//     assertThrows(() => parse("00", "D"), TypeError);
//     assertThrows(() => parse("01", "D"), TypeError);
//     assertThrows(() => parse("09", "D"), TypeError);
//     assertThrows(() => parse("32", "D"), TypeError);
//     assertThrows(() => parse("0", "D"), TypeError);
//     assertThrows(() => parse("111", "D"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - HH",
//   fn() {
//     assertEquals(parse("00", "HH").hour, 0); // allow 0hour
//     assertEquals(parse("01", "HH").hour, 1);
//     assertEquals(parse("02", "HH").hour, 2);
//     assertEquals(parse("03", "HH").hour, 3);
//     assertEquals(parse("04", "HH").hour, 4);
//     assertEquals(parse("05", "HH").hour, 5);
//     assertEquals(parse("06", "HH").hour, 6);
//     assertEquals(parse("07", "HH").hour, 7);
//     assertEquals(parse("08", "HH").hour, 8);
//     assertEquals(parse("09", "HH").hour, 9);
//     assertEquals(parse("10", "HH").hour, 10);
//     assertEquals(parse("11", "HH").hour, 11);
//     assertEquals(parse("12", "HH").hour, 12);
//     assertEquals(parse("13", "HH").hour, 13);
//     assertEquals(parse("14", "HH").hour, 14);
//     assertEquals(parse("15", "HH").hour, 15);
//     assertEquals(parse("16", "HH").hour, 16);
//     assertEquals(parse("17", "HH").hour, 17);
//     assertEquals(parse("18", "HH").hour, 18);
//     assertEquals(parse("19", "HH").hour, 19);
//     assertEquals(parse("20", "HH").hour, 20);
//     assertEquals(parse("21", "HH").hour, 21);
//     assertEquals(parse("22", "HH").hour, 22);
//     assertEquals(parse("23", "HH").hour, 23);
//     assertThrows(() => parse("24", "HH"), TypeError);
//     assertThrows(() => parse("0", "HH"), TypeError);
//     assertThrows(() => parse("1", "HH"), TypeError);
//     assertThrows(() => parse("111", "HH"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - H",
//   fn() {
//     assertEquals(parse("0", "H").hour, 0); // allow 0hour
//     assertEquals(parse("1", "H").hour, 1);
//     assertEquals(parse("2", "H").hour, 2);
//     assertEquals(parse("3", "H").hour, 3);
//     assertEquals(parse("4", "H").hour, 4);
//     assertEquals(parse("5", "H").hour, 5);
//     assertEquals(parse("6", "H").hour, 6);
//     assertEquals(parse("7", "H").hour, 7);
//     assertEquals(parse("8", "H").hour, 8);
//     assertEquals(parse("9", "H").hour, 9);
//     assertEquals(parse("10", "H").hour, 10);
//     assertEquals(parse("11", "H").hour, 11);
//     assertEquals(parse("12", "H").hour, 12);
//     assertEquals(parse("13", "H").hour, 13);
//     assertEquals(parse("14", "H").hour, 14);
//     assertEquals(parse("15", "H").hour, 15);
//     assertEquals(parse("16", "H").hour, 16);
//     assertEquals(parse("17", "H").hour, 17);
//     assertEquals(parse("18", "H").hour, 18);
//     assertEquals(parse("19", "H").hour, 19);
//     assertEquals(parse("20", "H").hour, 20);
//     assertEquals(parse("21", "H").hour, 21);
//     assertEquals(parse("22", "H").hour, 22);
//     assertEquals(parse("23", "H").hour, 23);
//     assertThrows(() => parse("00", "H"), TypeError);
//     assertThrows(() => parse("24", "H"), TypeError);
//     assertThrows(() => parse("01", "H"), TypeError);
//     assertThrows(() => parse("111", "H"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - hh",
//   fn() {
//     assertEquals(parse("00", "hh").hour, 0); // allow 0hour
//     assertEquals(parse("01", "hh").hour, 1);
//     assertEquals(parse("02", "hh").hour, 2);
//     assertEquals(parse("03", "hh").hour, 3);
//     assertEquals(parse("04", "hh").hour, 4);
//     assertEquals(parse("05", "hh").hour, 5);
//     assertEquals(parse("06", "hh").hour, 6);
//     assertEquals(parse("07", "hh").hour, 7);
//     assertEquals(parse("08", "hh").hour, 8);
//     assertEquals(parse("09", "hh").hour, 9);
//     assertEquals(parse("10", "hh").hour, 10);
//     assertEquals(parse("11", "hh").hour, 11);
//     assertEquals(parse("12", "hh").hour, 12);
//     assertThrows(() => parse("13", "hh"), TypeError);
//     assertThrows(() => parse("0", "hh"), TypeError);
//     assertThrows(() => parse("1", "hh"), TypeError);
//     assertThrows(() => parse("111", "hh"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - h",
//   fn() {
//     assertEquals(parse("0", "h").hour, 0); // allow 0hour
//     assertEquals(parse("1", "h").hour, 1);
//     assertEquals(parse("2", "h").hour, 2);
//     assertEquals(parse("3", "h").hour, 3);
//     assertEquals(parse("4", "h").hour, 4);
//     assertEquals(parse("5", "h").hour, 5);
//     assertEquals(parse("6", "h").hour, 6);
//     assertEquals(parse("7", "h").hour, 7);
//     assertEquals(parse("8", "h").hour, 8);
//     assertEquals(parse("9", "h").hour, 9);
//     assertEquals(parse("10", "h").hour, 10);
//     assertEquals(parse("11", "h").hour, 11);
//     assertEquals(parse("12", "h").hour, 12);
//     assertThrows(() => parse("00", "h"), TypeError);
//     assertThrows(() => parse("13", "h"), TypeError);
//     assertThrows(() => parse("01", "h"), TypeError);
//     assertThrows(() => parse("111", "h"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - mm",
//   fn() {
//     assertEquals(parse("00", "mm").minute, 0); // allow 0min
//     assertEquals(parse("01", "mm").minute, 1);
//     assertEquals(parse("02", "mm").minute, 2);
//     assertEquals(parse("03", "mm").minute, 3);
//     assertEquals(parse("04", "mm").minute, 4);
//     assertEquals(parse("05", "mm").minute, 5);
//     assertEquals(parse("06", "mm").minute, 6);
//     assertEquals(parse("07", "mm").minute, 7);
//     assertEquals(parse("08", "mm").minute, 8);
//     assertEquals(parse("09", "mm").minute, 9);
//     assertEquals(parse("10", "mm").minute, 10);
//     assertEquals(parse("50", "mm").minute, 50);
//     assertEquals(parse("51", "mm").minute, 51);
//     assertEquals(parse("52", "mm").minute, 52);
//     assertEquals(parse("53", "mm").minute, 53);
//     assertEquals(parse("54", "mm").minute, 54);
//     assertEquals(parse("55", "mm").minute, 55);
//     assertEquals(parse("56", "mm").minute, 56);
//     assertEquals(parse("57", "mm").minute, 57);
//     assertEquals(parse("58", "mm").minute, 58);
//     assertEquals(parse("59", "mm").minute, 59);
//     assertThrows(() => parse("0", "mm"), TypeError);
//     assertThrows(() => parse("60", "mm"), TypeError);
//     assertThrows(() => parse("1", "mm"), TypeError);
//     assertThrows(() => parse("111", "mm"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - m",
//   fn() {
//     assertEquals(parse("0", "m").minute, 0); // allow 0min
//     assertEquals(parse("1", "m").minute, 1);
//     assertEquals(parse("2", "m").minute, 2);
//     assertEquals(parse("3", "m").minute, 3);
//     assertEquals(parse("4", "m").minute, 4);
//     assertEquals(parse("5", "m").minute, 5);
//     assertEquals(parse("6", "m").minute, 6);
//     assertEquals(parse("7", "m").minute, 7);
//     assertEquals(parse("8", "m").minute, 8);
//     assertEquals(parse("9", "m").minute, 9);
//     assertEquals(parse("10", "m").minute, 10);
//     assertEquals(parse("50", "m").minute, 50);
//     assertEquals(parse("51", "m").minute, 51);
//     assertEquals(parse("52", "m").minute, 52);
//     assertEquals(parse("53", "m").minute, 53);
//     assertEquals(parse("54", "m").minute, 54);
//     assertEquals(parse("55", "m").minute, 55);
//     assertEquals(parse("56", "m").minute, 56);
//     assertEquals(parse("57", "m").minute, 57);
//     assertEquals(parse("58", "m").minute, 58);
//     assertEquals(parse("59", "m").minute, 59);
//     assertThrows(() => parse("00", "m"), TypeError);
//     assertThrows(() => parse("60", "m"), TypeError);
//     assertThrows(() => parse("01", "m"), TypeError);
//     assertThrows(() => parse("111", "m"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - ss",
//   fn() {
//     assertEquals(parse("00", "ss").second, 0); // allow 00s
//     assertEquals(parse("01", "ss").second, 1);
//     assertEquals(parse("02", "ss").second, 2);
//     assertEquals(parse("03", "ss").second, 3);
//     assertEquals(parse("04", "ss").second, 4);
//     assertEquals(parse("05", "ss").second, 5);
//     assertEquals(parse("06", "ss").second, 6);
//     assertEquals(parse("07", "ss").second, 7);
//     assertEquals(parse("08", "ss").second, 8);
//     assertEquals(parse("09", "ss").second, 9);
//     assertEquals(parse("10", "ss").second, 10);
//     assertEquals(parse("50", "ss").second, 50);
//     assertEquals(parse("51", "ss").second, 51);
//     assertEquals(parse("52", "ss").second, 52);
//     assertEquals(parse("53", "ss").second, 53);
//     assertEquals(parse("54", "ss").second, 54);
//     assertEquals(parse("55", "ss").second, 55);
//     assertEquals(parse("56", "ss").second, 56);
//     assertEquals(parse("57", "ss").second, 57);
//     assertEquals(parse("58", "ss").second, 58);
//     assertEquals(parse("59", "ss").second, 59);
//     assertThrows(() => parse("60", "ss"), TypeError);
//     assertThrows(() => parse("0", "ss"), TypeError);
//     assertThrows(() => parse("1", "ss"), TypeError);
//     assertThrows(() => parse("111", "ss"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - s",
//   fn() {
//     assertEquals(parse("0", "s").second, 0); // allow 0s
//     assertEquals(parse("1", "s").second, 1);
//     assertEquals(parse("2", "s").second, 2);
//     assertEquals(parse("3", "s").second, 3);
//     assertEquals(parse("4", "s").second, 4);
//     assertEquals(parse("5", "s").second, 5);
//     assertEquals(parse("6", "s").second, 6);
//     assertEquals(parse("7", "s").second, 7);
//     assertEquals(parse("8", "s").second, 8);
//     assertEquals(parse("9", "s").second, 9);
//     assertEquals(parse("10", "s").second, 10);
//     assertEquals(parse("50", "s").second, 50);
//     assertEquals(parse("51", "s").second, 51);
//     assertEquals(parse("52", "s").second, 52);
//     assertEquals(parse("53", "s").second, 53);
//     assertEquals(parse("54", "s").second, 54);
//     assertEquals(parse("55", "s").second, 55);
//     assertEquals(parse("56", "s").second, 56);
//     assertEquals(parse("57", "s").second, 57);
//     assertEquals(parse("58", "s").second, 58);
//     assertEquals(parse("59", "s").second, 59);
//     assertThrows(() => parse("00", "s"), TypeError);
//     assertThrows(() => parse("60", "s"), TypeError);
//     assertThrows(() => parse("01", "s"), TypeError);
//     assertThrows(() => parse("111", "s"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - SSS",
//   fn() {
//     assertEquals(parse("000", "SSS").millisecond, 0); // allow 000ms
//     assertEquals(parse("001", "SSS").millisecond, 1);
//     assertEquals(parse("002", "SSS").millisecond, 2);
//     assertEquals(parse("003", "SSS").millisecond, 3);
//     assertEquals(parse("004", "SSS").millisecond, 4);
//     assertEquals(parse("005", "SSS").millisecond, 5);
//     assertEquals(parse("006", "SSS").millisecond, 6);
//     assertEquals(parse("007", "SSS").millisecond, 7);
//     assertEquals(parse("008", "SSS").millisecond, 8);
//     assertEquals(parse("009", "SSS").millisecond, 9);
//     assertEquals(parse("010", "SSS").millisecond, 10);
//     assertEquals(parse("100", "SSS").millisecond, 100);
//     assertEquals(parse("990", "SSS").millisecond, 990);
//     assertEquals(parse("991", "SSS").millisecond, 991);
//     assertEquals(parse("992", "SSS").millisecond, 992);
//     assertEquals(parse("993", "SSS").millisecond, 993);
//     assertEquals(parse("994", "SSS").millisecond, 994);
//     assertEquals(parse("995", "SSS").millisecond, 995);
//     assertEquals(parse("996", "SSS").millisecond, 996);
//     assertEquals(parse("997", "SSS").millisecond, 997);
//     assertEquals(parse("998", "SSS").millisecond, 998);
//     assertEquals(parse("999", "SSS").millisecond, 999);
//     assertThrows(() => parse("0", "SSS"), TypeError);
//     assertThrows(() => parse("00", "SSS"), TypeError);
//     assertThrows(() => parse("0000", "SSS"), TypeError);
//     assertThrows(() => parse("1000", "SSS"), TypeError);
//     assertThrows(() => parse("1", "SSS"), TypeError);
//     assertThrows(() => parse("1111", "SSS"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - S",
//   fn() {
//     assertEquals(parse("0", "S").millisecond, 0); // allow 0ms
//     assertEquals(parse("1", "S").millisecond, 1);
//     assertEquals(parse("2", "S").millisecond, 2);
//     assertEquals(parse("3", "S").millisecond, 3);
//     assertEquals(parse("4", "S").millisecond, 4);
//     assertEquals(parse("5", "S").millisecond, 5);
//     assertEquals(parse("6", "S").millisecond, 6);
//     assertEquals(parse("7", "S").millisecond, 7);
//     assertEquals(parse("8", "S").millisecond, 8);
//     assertEquals(parse("9", "S").millisecond, 9);
//     assertEquals(parse("10", "S").millisecond, 10);
//     assertEquals(parse("100", "S").millisecond, 100);
//     assertEquals(parse("990", "S").millisecond, 990);
//     assertEquals(parse("991", "S").millisecond, 991);
//     assertEquals(parse("992", "S").millisecond, 992);
//     assertEquals(parse("993", "S").millisecond, 993);
//     assertEquals(parse("994", "S").millisecond, 994);
//     assertEquals(parse("995", "S").millisecond, 995);
//     assertEquals(parse("996", "S").millisecond, 996);
//     assertEquals(parse("997", "S").millisecond, 997);
//     assertEquals(parse("998", "S").millisecond, 998);
//     assertEquals(parse("999", "S").millisecond, 999);
//     assertThrows(() => parse("00", "S"), TypeError);
//     assertThrows(() => parse("000", "S"), TypeError);
//     assertThrows(() => parse("0000", "S"), TypeError);
//     assertThrows(() => parse("1000", "S"), TypeError);
//     assertThrows(() => parse("001", "S"), TypeError);
//     assertThrows(() => parse("010", "S"), TypeError);
//     assertThrows(() => parse("1111", "S"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - A",
//   fn() {
//     assertEquals(parse("AM", "A").ampm, "am");
//     assertEquals(parse("PM", "A").ampm, "pm");
//     assertThrows(() => parse("am", "A"), TypeError);
//     assertThrows(() => parse("pm", "A"), TypeError);
//     assertThrows(() => parse("xxx", "A"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - a",
//   fn() {
//     assertEquals(parse("am", "a").ampm, "am");
//     assertEquals(parse("pm", "a").ampm, "pm");
//     assertThrows(() => parse("AM", "a"), TypeError);
//     assertThrows(() => parse("PM", "a"), TypeError);
//     assertThrows(() => parse("xxx", "a"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - X",
//   fn() {
//     assertEquals(parse("1692358565.712", "X").unixtime, 1692358565.712);
//     assertEquals(parse("1692358565", "X").unixtime, 1692358565);
//     assertEquals(parse("0", "X").unixtime, 0);
//     assertThrows(() => parse("1692358565.", "X"), TypeError);
//     assertThrows(() => parse(".", "X"), TypeError);
//     assertThrows(() => parse(".1", "X"), TypeError);
//     assertThrows(() => parse("", "X"), TypeError);
//     assertThrows(() => parse("xxxx", "X"), TypeError);
//   },
// });

// Deno.test({
//   name: "parser - x",
//   fn() {
//     assertEquals(parse("1692358565", "x").unixtime, 1692358565);
//     assertEquals(parse("0", "x").unixtime, 0);
//     assertThrows(() => parse("1692358565.712", "x"), TypeError);
//     assertThrows(() => parse("1692358565.", "x"), TypeError);
//     assertThrows(() => parse(".", "x"), TypeError);
//     assertThrows(() => parse(".1", "x"), TypeError);
//     assertThrows(() => parse("", "x"), TypeError);
//     assertThrows(() => parse("xxxx", "x"), TypeError);
//   },
// });

Deno.test({
  name: "parser - invalid",
  fn() {
    // failed to parse if invalid
    assertThrows(() => {
      parse("aaaaaaa", "YYYY-MM-DD");
    });
  },
});
