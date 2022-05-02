import { Category } from '../Category';
import { Name } from '../Name';

export const HiddenName = Symbol();

export type SlotName = Name | typeof HiddenName;

export interface SlotContent {
  name: SlotName;
  category: Category;
}
