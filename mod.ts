import {
  Temporal,
  toTemporalInstant,
} from "https://esm.sh/@js-temporal/polyfill@0.4.4";

declare global {
  interface Date {
    toTemporalInstant(this: Date): Temporal.Instant;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;

export function instantFrom(str: string) {
  str;
}

export interface ParseResult {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  ampm?: "am" | "pm";
  unixtime: number;
}

export function parse(str: string, format: string): ParseResult {
  const formats = {
    YYYY: { type: "year", regexp: "\\d{4}" }, // 2001年 4桁の年
    // YY: { type: "year", regexp: "\\d{2}" },
    // ["MMMM", ""], // 1月～12月 完全な月名
    // ["MMM", ""], // 1月～12月 月の短縮名
    MM: { type: "month", regexp: "0[1-9]|10|11|12" }, // 01-12 月、2桁
    M: { type: "month", regexp: "[1-9]|10|11|12" }, // 1-12 1 から始まる月
    DD: { type: "day", regexp: "0[1-9]|[1-2][0-9]|30|31" }, // 01-31 日、2 桁
    D: { type: "day", regexp: "[1-9]|[1-2][0-9]|30|31" }, // 1-31 月の日
    HH: { type: "hour", regexp: "0[0-9]|1[0-9]|2[0-3]" }, // 00-23 時間、2 桁
    H: { type: "hour", regexp: "[0-9]|1[0-9]|2[0-3]" }, // 0-23 時間
    hh: { type: "hour", regexp: "0[0-9]|1[0-2]" }, // 01-12 時、12 時間制、2 桁
    h: { type: "hour", regexp: "[0-9]|1[0-2]" }, // 1-12 時間、12 時間制
    mm: { type: "minute", regexp: "[0-5][0-9]" }, // 00-59 分、2桁
    m: { type: "minute", regexp: "[0-9]|[1-5][0-9]" }, // 0-59 分
    ss: { type: "second", regexp: "[0-5][0-9]" }, // 00-59 秒、2桁
    s: { type: "second", regexp: "[0-9]|[1-5][0-9]" }, // 0-59 秒
    SSS: { type: "millisecond", regexp: "\\d{3}" }, // 000-999 ミリ秒、3 桁
    // SS: { type: "millisecond", regexp: "\\d{2}" }, // 00-99 数十ミリ秒、2桁
    S: { type: "millisecond", regexp: "[0-9]|[1-9][0-9]|[1-9][0-9][0-9]" }, // 0-999 数百ミリ秒、1桁
    // ["Z", ""], // -05:00 UTC からのオフセット
    // ["ZZ", ""], // -0500 UTC からのコンパクトなオフセット、2 桁
    A: { type: "ampm", regexp: "(AM|PM)" }, // 午前午後 午前中または午前中、大文字
    a: { type: "ampm", regexp: "(am|pm)" }, // 午前午後 午前中または午前中、小文字
    // ["Do", ""], // 1日…31日 序数を使用した日付
    X: { type: "unixtime", regexp: "\\d+(\\.\\d+)?" }, // 1410715640.579 Unix タイムスタンプ
    x: { type: "unixtime", regexp: "\\d+" }, // 1410715640579 Unix ms タイムスタンプ
  };

  const formatRegexpSource = format
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replaceAll(
      new RegExp(`(${Object.keys(formats).join("|")})`, "g"),
      (target) => {
        const { type, regexp } = formats[target as keyof typeof formats];
        return `(?<${type}>${regexp})`;
      },
    );
  const matchResult = str.match(new RegExp(`^${formatRegexpSource}$`));

  if (matchResult === null) {
    throw new TypeError(`Unknown format string: ${str}`);
  }

  const { groups } = matchResult;
  return {
    year: groups?.year != undefined ? Number(groups.year) : 0,
    month: groups?.month != undefined ? Number(groups.month) : 1, // default month is 1
    day: groups?.day != undefined ? Number(groups.day) : 1, // default day is 1
    hour: groups?.hour != undefined ? Number(groups.hour) : 0,
    minute: groups?.minute != undefined ? Number(groups.minute) : 0,
    second: groups?.second != undefined ? Number(groups.second) : 0,
    millisecond: groups?.millisecond != undefined
      ? Number(groups.millisecond)
      : 0,
    ampm: groups?.ampm?.toLowerCase() as ParseResult["ampm"],
    unixtime: groups?.unixtime != undefined ? Number(groups.unixtime) : 0,
  };
}
