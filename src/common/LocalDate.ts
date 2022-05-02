const assertFormat = (date: string): void => {
  if (!/^\d+-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`The date format for "${date}" is not valid, please use YYYY-MM-DD format`);
  }
};

const twoDigits = (number: number): string => number.toString().padStart(2, '0');

export class LocalDate {
  private readonly date: string;
  private readonly realDate: Date;

  constructor(date: string) {
    assertFormat(date);
    if (isNaN(Date.parse(date))) {
      throw new Error(`The date "${date}" is invalid`);
    }
    this.date = date as string;
    this.realDate = new Date(date);
  }

  static of(date: string): LocalDate {
    return new LocalDate(date);
  }

  static fromCurrentTimezone(date: Date) {
    const iso = [date.getFullYear(), ...[date.getMonth() + 1, date.getDate()].map(twoDigits)].join('-');
    return new LocalDate(iso);
  }

  static fromUTCDate(date: Date) {
    const iso = [date.getUTCFullYear(), ...[date.getUTCMonth() + 1, date.getUTCDate()].map(twoDigits)].join('-');
    return new LocalDate(iso);
  }

  get(): string {
    return this.date;
  }

  after(other: LocalDate): boolean {
    return this.realDate.getTime() > other.realDate.getTime();
  }

  tomorrow(): LocalDate {
    return this.changeDay((day) => day + 1);
  }

  yesterday(): LocalDate {
    return this.changeDay((day) => day - 1);
  }

  before(other: LocalDate): boolean {
    return this.realDate.getTime() < other.realDate.getTime();
  }

  range(end: LocalDate): LocalDate[] {
    return this.rangeFor(end);
  }

  private changeDay(newDay: (day: number) => number) {
    const date = new Date(this.realDate);
    date.setDate(newDay(date.getDate()));
    return LocalDate.fromUTCDate(date);
  }

  private rangeFor(end: LocalDate, dates: LocalDate[] = []): LocalDate[] {
    if (this.after(end)) {
      return dates;
    }
    return this.tomorrow().rangeFor(end, [...dates, this]);
  }
}
