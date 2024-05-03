type FormatType =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "ampm"
  | "minute"
  | "second"
  | "millisecond"
  | "nanosecond"
  | "timezone"
  | "offset"
  | "unixtime"
  | "undefined";

const formats: Record<string, { type?: FormatType; regexp: string }> = {
  // 2001 完全な予兆グレゴリオ暦年。ゼロが埋め込まれて 4 桁になります。chrono は、-262144 から 262143 までの年をサポートします。 注: 紀元前 1 年より前または西暦 9999 年以降の年には、最初の符号 (+/-) が必要です。
  "%Y": {
    type: "year",
    regexp: String.raw`(\d{4}|\+\d+|-\d+)`,
  },
  // "%-Y": { type: "year", regexp: "-?(\\d|[1-9]\\d{1,3})" },
  // "%_Y": {
  //   type: "year",
  //   regexp:
  //     "(\\s{3,}\\d|\\s{2,}[1-9]\\d|\\s{1,}[1-9]\\d{2}|\\s*[1-9]\\d{3}|\\s{2,}-\\d|\\s{1,}-[1-9]\\d|\\s*-[1-9]\\d{2}|\\s*-[1-9]\\d{3})",
  // },
  // "%0Y": { type: "year", regexp: "-?\\d{4}" },
  // "%C": { type: "year", regexp: "" }, // 20 予兆グレゴリオ暦を 100 で割ったもので、ゼロが埋め込まれて 2 桁になります。1
  // "%y": { type: "year", regexp: "" }, // 01 予兆グレゴリオ暦の 100 を法とする、2 桁にゼロ埋めされたもの。1
  "%m": { type: "month", regexp: "(0[1-9]|1[0-2])" }, // 07 月番号 (01 ～ 12)、ゼロ埋めされて 2 桁になります。
  "%-m": { type: "month", regexp: "([1-9]|1[0-2])" }, // 1 ~ 12
  // "%b": { type: "month", regexp: "" }, // Jul 月の略称。必ず3文字です。
  // "%B": { type: "month", regexp: "" }, // July 完全な月名。解析時に対応する略語も受け入れます。
  // "%h": { type: "month", regexp: "" }, // Jul と同じ%b。
  "%d": { type: "day", regexp: "(0[1-9]|1[0-9]|2[0-9]|3[0-1])" }, // 08 日番号 (01 ～ 31)、ゼロ埋めされて 2 桁になります。
  "%-d": { type: "day", regexp: "([1-9]|1[0-9]|2[0-9]|3[0-1])" }, // 1~31
  // "%e": { type: "day", regexp: "" }, //  8 と同じです%dが、スペースが埋め込まれています。と同じ%_d。
  // "%a": { type: "weekday", regexp: "" }, // Sun 曜日の略称。必ず3文字です。
  // "%A": { type: "weekday", regexp: "" }, // Sunday 完全な曜日名。解析時に対応する略語も受け入れます。
  // "%w": { type: "weekday", regexp: "" }, // 0 日曜日 = 0、月曜日 = 1、…、土曜日 = 6。
  // "%u": { type: "weekday", regexp: "" }, // 7 月曜日 = 1、火曜日 = 2、…、日曜日 = 7。(ISO 8601)
  // "%U": { type: "weekday", regexp: "" }, // 28 日曜日から始まる週番号 (00 ～ 53)、ゼロ埋めされて 2 桁になります。2
  // "%W": { type: "weekday", regexp: "" }, // 27 と同じです%Uが、第 1 週はその年の最初の月曜日から始まります。
  // "%G": { type: "weekday", regexp: "" }, // 2001 と同じです%Yが、ISO 8601 の週の日付の年番号を使用します。3
  // "%g": { type: "weekday", regexp: "" }, // 01 と同じです%yが、ISO 8601 の週の日付の年番号を使用します。3
  // "%V": { type: "weekday", regexp: "" }, // 27 と同じです%Uが、ISO 8601 週の日付の週番号 (01 ～ 53) を使用します。3
  // "%j": { type: "", regexp: "" }, // 189 年間通算日 (001 ～ 366)、ゼロ埋めされて 3 桁になります。
  // "%D": { type: "", regexp: "" }, // 07/08/01 月-日-年の形式。と同じ%m/%d/%y。
  // "%x": { type: "", regexp: "" }, // 07/08/01 ロケールの日付表現 (例: 12/31/99)。
  // "%F": { type: "", regexp: "" }, // 2001-07-08 年-月-日形式 (ISO 8601)。と同じ%Y-%m-%d。
  // "%v": { type: "", regexp: "" }, //  8-Jul-2001 日-月-年の形式。と同じ%e-%b-%Y。
  "%H": { type: "hour", regexp: "(0[0-9]|1[0-9]|2[0-3])" }, // 00 時間番号 (00 ～ 23)、ゼロ埋めされて 2 桁になります。
  "%-H": { type: "hour", regexp: "([0-9]|1[0-9]|2[0-3])" }, // 00 時間番号 (00 ～ 23)、ゼロ埋めされて 2 桁になります。
  // "%k": { type: "hour", regexp: "" }, //  0 と同じです%Hが、スペースが埋め込まれています。と同じ%_H。
  "%I": { type: "hour", regexp: "(0[0-9]|1[0-2])" }, // 12 12 時間制の時間番号 (01 ～ 12)、ゼロ埋めされて 2 桁になります。
  "%-I": { type: "hour", regexp: "([0-9]|1[0-2])" }, // 12 12 時間制の時間番号 (01 ～ 12)、ゼロ埋めされて 2 桁になります。
  // "%l": { type: "hour", regexp: "" }, // 12 と同じです%Iが、スペースが埋め込まれています。と同じ%_I。
  "%P": { type: "ampm", regexp: "(am|pm)" }, // am amまたはpm12時間制で表示されます。
  "%p": { type: "ampm", regexp: "(AM|PM)" }, // AM AMまたはPM12時間制で表示されます。
  "%M": { type: "minute", regexp: "([0-5][0-9])" }, // 34 分の数値 (00 ～ 59)、ゼロ埋めされて 2 桁になります。
  "%-M": { type: "minute", regexp: "([0-9]|[1-5][0-9])" },
  "%S": { type: "second", regexp: "([0-5][0-9])" }, // 60 2 番目の数値 (00 ～ 60)、ゼロ埋めされて 2 桁になります。4
  "%-S": { type: "second", regexp: "([0-9]|[1-5][0-9])" },
  "%f": { type: "nanosecond", regexp: String.raw`\d{9}` }, // 026490000 最後の整数秒以降の小数秒 (ナノ秒単位)。5
  "%.f": { type: "nanosecond", regexp: String.raw`\.\d+` }, // .026490 に似ています.%fが、左揃えです。これらはすべて先頭のドットを消費します。5
  "%.3f": { type: "nanosecond", regexp: String.raw`\.\d{3}` }, // .026 に似ています.%fが、左揃えですが、長さは 3.5 に固定されています。
  "%.6f": { type: "nanosecond", regexp: String.raw`\.\d{6}` }, // .026490 に似ています.%fが、左揃えですが、長さは 6.5 に固定されています。
  "%.9f": { type: "nanosecond", regexp: String.raw`\.\d{9}` }, // .026490000 に似ています.%fが、左揃えですが、長さは 9.5 に固定されています。
  "%3f": { type: "nanosecond", regexp: String.raw`\d{3}` }, // 026 に似ています%.3fが、先頭のドットがありません。5
  "%6f": { type: "nanosecond", regexp: String.raw`\d{6}` }, // 026490 に似ています%.6fが、先頭のドットがありません。5
  "%9f": { type: "nanosecond", regexp: String.raw`\d{9}` }, // 026490000 に似ています%.9fが、先頭のドットがありません。5
  // "%R": { type: "", regexp: "" }, // 00:34 時分形式。と同じ%H:%M。
  // "%T": { type: "", regexp: "" }, // 00:34:60 時分秒形式。と同じ%H:%M:%S。
  // "%X": { type: "", regexp: "" }, // 00:34:60 ロケールの時間表現 (例: 23:13:48)。
  // "%r": { type: "", regexp: "" }, // 12:34:60 AM 12 時間制の時分秒形式。と同じ%I:%M:%S %p。
  "%Z": { type: "timezone", regexp: "" }, // ACST ローカルタイムゾーン名。解析中に空白以外の文字をすべてスキップします。フォーマット時と同様%:z。6
  "%z": { type: "offset", regexp: "" }, // +0930 現地時間から UTC までのオフセット (UTC は+0000)。
  "%:z": { type: "offset", regexp: "" }, // +09:30 と同じです%zが、コロンが付いています。
  "%::z": { type: "offset", regexp: "" }, // +09:30:00 現地時間から UTC までの秒単位のオフセット。
  "%:::z": { type: "offset", regexp: "" }, // +09 分を含まない現地時間から UTC までのオフセット。
  "%#z": { type: "offset", regexp: "" }, // +09 解析のみ:と同じです%zが、分の欠落または存在が許可されます。
  // "%c": { type: "", regexp: "" }, // Sun Jul  8 00:34:60 2001 ロケールの日付と時刻 (例: Thu Mar 3 23:05:25 2005)。
  // "%+": { type: "", regexp: "" }, // 2001-07-08T00:34:60.026490+09:30 ISO 8601 / RFC 3339 の日付と時刻の形式。7
  "%s": { type: "unixtime", regexp: String.raw`\d+` }, // 994518299 UNIX タイムスタンプ、1970 年 1 月 1 日 00:00 UTC からの秒数。8
  "%t": { type: undefined, regexp: String.raw`\t` }, //  リテラルタブ ( \t)。
  "%n": { type: undefined, regexp: String.raw`\n` }, //  リテラルの改行 ( \n)。
  "%%": { type: undefined, regexp: "%" }, //  リテラルのパーセント記号。
  // "%-?": { type: "", regexp: "" }, // スペースやゼロを含むパディングを抑制します。(例%j= 012、%-j= 12)
  // "%_?": { type: "", regexp: "" }, // スペースをパディングとして使用します。(例%j= 012、%_j=  12)
  // "%0?": { type: "", regexp: "" }, // パディングとしてゼロを使用します。(例%e=  9、%0e= 09)

  // // a: { type: "weekday", regexp: "" }, // ロケールの曜日名を短縮形で表示します。 Sun, Mon, ..., Sat (en_US); So, Mo, ..., Sa (de_DE)
  // // A: { type: "weekday", regexp: "" }, // ロケールの曜日名を表示します。 Sunday, Monday, ..., Saturday (en_US); Sonntag, Montag, ..., Samstag (de_DE)
  // w: { type: "weekday", regexp: "[0-6]" }, // 曜日を10進表記した文字列を表示します。0 が日曜日で、6 が土曜日を表します。 0, 1, ..., 6
  // d: { type: "day", regexp: "" }, // 0埋めした10進数で表記した月中の日にち。 01, 02, ..., 31
  // // b: { type: "", regexp: "" }, // ロケールの月名を短縮形で表示します。 Jan, Feb, ..., Dec (en_US); Jan, Feb, ..., Dez (de_DE)
  // // B: { type: "", regexp: "" }, // ロケールの月名を表示します。 January, February, ..., December (en_US); Januar, Februar, ..., Dezember (de_DE)
  // m: { type: "", regexp: "" }, // 0埋めした10進数で表記した月。 01, 02, ..., 12
  // // y: { type: "", regexp: "" }, // 0埋めした10進数で表記した世紀無しの年。 00, 01, ..., 99
  // Y: { type: "", regexp: "" }, // 西暦 ( 4桁) の 10 進表記を表します。 0001, 0002, ..., 2013, 2014, ..., 9998, 9999
  // H: { type: "", regexp: "" }, // 0埋めした10進数で表記した時 (24時間表記)。 00, 01, ..., 23
  // I: { type: "", regexp: "" }, // 0埋めした10進数で表記した時 (12時間表記)。 01, 02, ..., 12
  // p: { type: "", regexp: "" }, // ロケールの AM もしくは PM と等価な文字列になります。 AM, PM (en_US); am, pm (de_DE)
  // M: { type: "", regexp: "" }, // 0埋めした10進数で表記した分。 00, 01, ..., 59
  // S: { type: "", regexp: "" }, // 0埋めした10進数で表記した秒。 00, 01, ..., 59
  // f: { type: "", regexp: "" }, // 10進数で表記したマイクロ秒 (6桁に0埋めされます)。 000000, 000001, ..., 999999
  // z: { type: "", regexp: "" }, // UTCオフセットを ±HHMM[SS[.ffffff]] の形式で表示します (オブジェクトがnaiveであれば空文字列)。 (空文字列), +0000, -0400, +1030, +063415, -030712.345216
  // Z: { type: "", regexp: "" }, // タイムゾーンの名前を表示します (オブジェクトがnaiveであれば空文字列)。 (空文字列), UTC, GMT
  // // j: { type: "", regexp: "" }, // 0埋めした10進数で表記した年中の日にち。 001, 002, ..., 366
  // // U: { type: "", regexp: "" }, // 0埋めした10進数で表記した年中の週番号 (週の始まりは日曜日とする)。新年の最初の日曜日に先立つ日は 0週に属するとします。 00, 01, ..., 53
  // // W: { type: "", regexp: "" }, // 0埋めした10進数で表記した年中の週番号 (週の始まりは月曜日とする)。新年の最初の月曜日に先立つ日は 0週に属するとします。 00, 01, ..., 53
  // // c: { type: "", regexp: "" }, // ロケールの日時を適切な形式で表します。 Tue Aug 16 21:30:00 1988 (en_US); Di 16 Aug 21:30:00 1988 (de_DE)
  // // x: { type: "", regexp: "" }, // ロケールの日付を適切な形式で表します。 08/16/88 (None); 08/16/1988 (en_US); 16.08.1988 (de_DE)
  // // X: { type: "", regexp: "" }, // ロケールの時間を適切な形式で表します。 21:30:00 (en_US); 21:30:00 (de_DE)
  // "%": { type: "", regexp: "" }, // 文字 '%' を表します。 %
  // // G: { type: "", regexp: "" }, // ISO week(%V)の内過半数を含む西暦表記の ISO 8601 year です。 0001, 0002, ..., 2013, 2014, ..., 9998, 9999
  // // u: { type: "", regexp: "" }, // 1 を月曜日を表す 10進数表記の ISO 8601 weekday です。 1, 2, ..., 7
  // // V: { type: "", regexp: "" }, // 週で最初の月曜日を始めとする ISO 8601 week です。Week 01 は 1月4日を含みます。 01, 02, ..., 53

  // YYYY: { type: "year", regexp: "\\d{4}" }, // 2001年 4桁の年
  // // YY: { type: "year", regexp: "\\d{2}" },
  // // ["MMMM", ""], // 1月～12月 完全な月名
  // // ["MMM", ""], // 1月～12月 月の短縮名
  // MM: { type: "month", regexp: "0[1-9]|10|11|12" }, // 01-12 月、2桁
  // M: { type: "month", regexp: "[1-9]|10|11|12" }, // 1-12 1 から始まる月
  // DD: { type: "day", regexp: "0[1-9]|[1-2][0-9]|30|31" }, // 01-31 日、2 桁
  // D: { type: "day", regexp: "[1-9]|[1-2][0-9]|30|31" }, // 1-31 月の日
  // HH: { type: "hour", regexp: "0[0-9]|1[0-9]|2[0-3]" }, // 00-23 時間、2 桁
  // H: { type: "hour", regexp: "[0-9]|1[0-9]|2[0-3]" }, // 0-23 時間
  // hh: { type: "hour", regexp: "0[0-9]|1[0-2]" }, // 01-12 時、12 時間制、2 桁
  // h: { type: "hour", regexp: "[0-9]|1[0-2]" }, // 1-12 時間、12 時間制
  // mm: { type: "minute", regexp: "[0-5][0-9]" }, // 00-59 分、2桁
  // m: { type: "minute", regexp: "[0-9]|[1-5][0-9]" }, // 0-59 分
  // ss: { type: "second", regexp: "[0-5][0-9]" }, // 00-59 秒、2桁
  // s: { type: "second", regexp: "[0-9]|[1-5][0-9]" }, // 0-59 秒
  // SSS: { type: "millisecond", regexp: "\\d{3}" }, // 000-999 ミリ秒、3 桁
  // // SS: { type: "millisecond", regexp: "\\d{2}" }, // 00-99 数十ミリ秒、2桁
  // S: { type: "millisecond", regexp: "[0-9]|[1-9][0-9]|[1-9][0-9][0-9]" }, // 0-999 数百ミリ秒、1桁
  // // ["Z", ""], // -05:00 UTC からのオフセット
  // // ["ZZ", ""], // -0500 UTC からのコンパクトなオフセット、2 桁
  // A: { type: "ampm", regexp: "(AM|PM)" }, // 午前午後 午前中または午前中、大文字
  // a: { type: "ampm", regexp: "(am|pm)" }, // 午前午後 午前中または午前中、小文字
  // // ["Do", ""], // 1日…31日 序数を使用した日付
  // X: { type: "unixtime", regexp: "\\d+(\\.\\d+)?" }, // 1410715640.579 Unix タイムスタンプ
  // x: { type: "unixtime", regexp: "\\d+" }, // 1410715640579 Unix ms タイムスタンプ
};

const formatsTargetRegexp = new RegExp(
  `(${Object.keys(formats).join("|")})`,
  "g",
);

const regexpCache: Record<string, RegExp | undefined> = {};
function getRegexp(format: string) {
  return regexpCache[format] ??= new RegExp(`^${
    format
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replaceAll(formatsTargetRegexp, (target) => {
        const { type, regexp } = formats[target as keyof typeof formats];
        return type ? `(?<${type}>${regexp})` : `(${regexp})`;
      })
  }$`);
}

/**
 * parsing datetime string.
 *
 *
 * ```
 * import { parse } from "@ayame113/temporarily";
 *
 * const parsed = parse("2024-05-03 15:25:29", "%Y-%m-%d %H:%M:%S");
 * console.log(parsed); // { year: 2024, month: 5, day: 3, hour: 15, minute: 25, second: 29 }
 *
 * const date = Temporal.PlainDateTime.from(parsed);
 * console.log(date); // Temporal { 2024-05-03T15:25:29 }
```
 *
 * @param input string you want to parse
 * @param format format of string
 * @returns parsed result
 */
export function parse(input: string, format: string): ParseResult {
  const formatRegexpSource = getRegexp(format);
  const matchResult = input.match(formatRegexpSource);

  if (matchResult === null) {
    throw new TypeError(
      `String ${input} did not match regular expression ^${formatRegexpSource}$.`,
    );
  }

  const groups = matchResult.groups as { [key in FormatType]?: string };
  const parseResult = {
    year: groups?.year != undefined ? Number(groups.year) : 0,
    month: groups?.month != undefined ? Number(groups.month) : 1, // default month is 1
    day: groups?.day != undefined ? Number(groups.day) : 1, // default day is 1
    hour: groups?.hour != undefined ? Number(groups.hour) : 0,
    minute: groups?.minute != undefined ? Number(groups.minute) : 0,
    second: groups?.second != undefined ? Number(groups.second) : 0,
    millisecond: groups?.millisecond != undefined
      ? Number(groups.millisecond)
      : 0,
    nanosecond: groups?.nanosecond != undefined ? Number(groups.nanosecond) : 0,
    unixtime: groups?.unixtime != undefined
      ? Number(groups.unixtime)
      : undefined,
  } satisfies ParseResult;

  // ampm対応
  const ampm = groups?.ampm?.toLowerCase() as "am" | "pm" | undefined;
  if (ampm) {
    if (12 < parseResult.hour) {
      throw new TypeError(
        "You cannot specify AM or PM for times with hours greater than 12 hours.",
      );
    }

    // AM12時/PM12時対応
    if (ampm === "pm") {
      if (parseResult.hour < 12) {
        parseResult.hour += 12;
      }
    } else {
      if (parseResult.hour == 12) {
        parseResult.hour = 0;
      }
    }
  }

  return parseResult;
}

export interface ParseResult {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  nanosecond: number;
  unixtime: number | undefined;
}
