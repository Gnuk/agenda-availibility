import { Category } from '../../../../../src/agenda/domain/Category';
import { Name } from '../../../../../src/agenda/domain/Name';
import { Period } from '../../../../../src/agenda/domain/slot/Period';
import { LocalDate } from '../../../../../src/common/LocalDate';

describe('Period', () => {
  it.each([
    { start: '2022-01-03', end: '2022-01-02' },
    { start: '2022-01-01', end: '2021-12-31' },
  ])('Should not have an end ($end) before start ($start)', ({ start, end }) =>
    expect(() =>
      Period.of({
        start: LocalDate.of(start),
        end: LocalDate.of(end),
        category: Category.of('Category'),
        name: Name.of('Name'),
      })
    ).toThrow(`End date ${end} should not be before start date ${start}`)
  );

  it('Should convert to slot list', () => {
    expect(
      Period.of({
        start: LocalDate.of('2022-01-01'),
        end: LocalDate.of('2022-01-05'),
        category: Category.of('Category'),
        name: Name.of('Name'),
      })
        .toSlots()
        .map(({ day }) => day.get())
    ).toEqual(['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05']);
  });
});
