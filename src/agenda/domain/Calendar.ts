import { UID } from '../../common/UID';

import { Categories } from './Categories';
import { Category } from './Category';
import { HiddenName, Slot } from './Slot';
import { Slots } from './Slots';

const permitSlot =
  (categories: Category[]) =>
  (slot: Slot): Slot => {
    if (slot.category.isIn(categories)) {
      return slot;
    }
    return {
      ...slot,
      name: HiddenName,
    };
  };

export class Calendar {
  constructor(private readonly categories: Categories, private readonly slots: Slots) {}
  async listFor(uid: UID): Promise<Slot[]> {
    const [categories, slots] = await Promise.all([this.categories.listFor(uid), this.slots.list()]);
    return slots.map(permitSlot(categories));
  }
}
