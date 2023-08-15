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

export function parse(str: string, format: string) {
  const formats = {
    YYYY: { type: "year", regexp: "\\d{4}" }, //	2001年	4桁の年
    YY: { type: "year", regexp: "\\d{2}" },
    // ["MMMM", ""], //	1月～12月	完全な月名
    // ["MMM", ""], //	1月～12月	月の短縮名
    MM: { type: "month", regexp: "\\d{2}" }, //	01-12	月、2桁
    M: { type: "month", regexp: "\\d{1,2}" }, //	1-12	1 から始まる月
    DD: { type: "day", regexp: "\\d{2}" }, //	01-31	日、2 桁
    D: { type: "day", regexp: "\\d{1,2}" }, //	1-31	月の日
    HH: { type: "hour", regexp: "\\d{2}" }, //	00-23	時間、2 桁
    H: { type: "hour", regexp: "\\d{1,2}" }, //	0-23	時間
    hh: { type: "hour", regexp: "\\d{2}" }, //	01-12	時、12 時間制、2 桁
    h: { type: "hour", regexp: "\\d{1,2}" }, //	1-12	時間、12 時間制
    mm: { type: "minute", regexp: "\\d{2}" }, //	00-59	分、2桁
    m: { type: "minute", regexp: "\\d{1,2}" }, //	0-59	分
    ss: { type: "second", regexp: "\\d{2}" }, //	00-59	秒、2桁
    s: { type: "second", regexp: "\\d{1,2}" }, //	0-59	秒
    SSS: { type: "second", regexp: "\\d{3}" }, //	000-999	ミリ秒、3 桁
    SS: { type: "millisecond", regexp: "\\d{2}" }, //	00-99	数十ミリ秒、2桁
    S: { type: "millisecond", regexp: "\\d{1}" }, //	0-9	数百ミリ秒、1桁
    // ["Z", ""], //	-05:00	UTC からのオフセット
    // ["ZZ", ""], //	-0500	UTC からのコンパクトなオフセット、2 桁
    A: { type: "ampm", regexp: "(AM|PM)" }, //	午前午後	午前中または午前中、大文字
    a: { type: "ampm", regexp: "(am|pm)" }, //	午前午後	午前中または午前中、小文字
    // ["Do", ""], //	1日…31日	序数を使用した日付
    X: { type: "unixtime", regexp: "\\d*" }, //	1410715640.579	Unix タイムスタンプ
    x: { type: "unixtime", regexp: "\\d*" }, //	1410715640579	Unix ms タイムスタンプ
  };

  const formatRegexpSource = format.replaceAll(
    new RegExp(`(${Object.keys(formats).join("|")})`, "g"),
    (target) => {
      const { type, regexp } = formats[target as keyof typeof formats];
      return `(?<${type}>${regexp})`;
    },
  );
  const matchResult = str.match(new RegExp(formatRegexpSource));

  if (matchResult === null) {
    throw new TypeError(`Unknown format string: ${str}`);
  }

  const { groups } = matchResult;
  return {
    year: groups?.year != undefined ? groups.year : 0,
    month: groups?.month != undefined ? groups.month : 0,
    day: groups?.day != undefined ? groups.day : 0,
    hour: groups?.hour != undefined ? groups.hour : 0,
    minute: groups?.minute != undefined ? groups.minute : 0,
    second: groups?.second != undefined ? groups.second : 0,
    millisecond: groups?.millisecond != undefined ? groups.millisecond : 0,
    ampm: groups?.ampm?.toLowerCase(),
    unixtime: groups?.unixtime != undefined ? groups.unixtime : 0,
  };
  // let formatRegexp = format;
  // for (const [formatString, type, regexp] of formats) {
  //   formatRegexp = formatRegexp.replaceAll(
  //     formatString,
  //     `(?<${type}>${regexp})`,
  //   );
  // }
  // console.log(new RegExp(`^${formatRegexp}$`));
  // return str.match(new RegExp(formatRegexp));
}
