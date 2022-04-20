const assertFormat = (date: string): void => {
  if (!/^\d+-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`The date format for "${date}" is not valid, please use YYYY-MM-DD format`);
  }
};

const twoDigits = (number: number): string => number.toString().padStart(2, '0');

export class LocalDate {
  private readonly date: string;
  constructor(date: string) {
    assertFormat(date);
    if (isNaN(Date.parse(date))) {
      throw new Error(`The date "${date}" is invalid`);
    }
    this.date = date as string;
  }

  static of(date: string): LocalDate {
    return new LocalDate(date);
  }

  static fromCurrentTimezone(date: Date) {
    const iso = [date.getFullYear(), ...[date.getMonth() + 1, date.getDate()].map(twoDigits)].join('-');
    return new LocalDate(iso);
  }

  get(): string {
    return this.date;
  }
}
