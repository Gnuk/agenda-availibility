import { Category } from '../../../../src/agenda/domain/Category';
import { Name } from '../../../../src/agenda/domain/Name';
import { Slots } from '../../../../src/agenda/domain/Slots';
import { SlotsInMemory } from '../../../../src/agenda/domain/SlotsInMemory';
import { LocalDate } from '../../../../src/common/LocalDate';

export const makeSlots = (): Slots =>
  new SlotsInMemory([
    {
      name: Name.of('First'),
      day: LocalDate.of('2022-01-01'),
      category: Category.of('42'),
    },
    {
      name: Name.of('Second'),
      day: LocalDate.of('2022-01-02'),
      category: Category.of('Pear'),
    },
    {
      name: Name.of('Third'),
      day: LocalDate.of('2022-01-03'),
      category: Category.of('Pear'),
    },
    {
      name: Name.of('Fourth'),
      day: LocalDate.of('2022-01-04'),
      category: Category.of('ACME'),
    },
  ]);
