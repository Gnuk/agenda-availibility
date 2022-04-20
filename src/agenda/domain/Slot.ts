import { LocalDate } from '../../common/LocalDate';

import { Category } from './Category';
import { Name } from './Name';

export const HiddenName = Symbol();

export type SlotName = Name | typeof HiddenName;

export interface Slot {
  day: LocalDate;
  name: SlotName;
  category: Category;
}
