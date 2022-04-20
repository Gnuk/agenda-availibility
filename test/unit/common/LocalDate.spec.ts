import { LocalDate } from '../../../src/common/LocalDate';

describe('LocalDate', () => {
  it('Should not build for invalid format', () => {
    expect(() => LocalDate.of('2020-2020-2020')).toThrow('The date format for "2020-2020-2020" is not valid, please use YYYY-MM-DD format');
  });

  it('Should not build for invalid date', () => {
    expect(() => LocalDate.of('2020-42-32')).toThrow('The date "2020-42-32" is invalid');
  });

  it.each([
    { year: 2020, month: 2, day: 1, iso: '2020-02-01' },
    { year: 2020, month: 12, day: 15, iso: '2020-12-15' },
  ])('Should get "$iso" from current timezone of the year $year with month $month and the day $day', ({ year, month, day, iso }) => {
    const start = new Date();
    start.setFullYear(year);
    start.setMonth(month - 1);
    start.setDate(day);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);

    const end = new Date(start);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    end.setMilliseconds(999);

    expect(LocalDate.fromCurrentTimezone(start).get()).toBe(iso);
    expect(LocalDate.fromCurrentTimezone(end).get()).toBe(iso);
  });

  it('Should get', () => {
    expect(LocalDate.of('2020-10-01').get()).toBe('2020-10-01');
  });
});
