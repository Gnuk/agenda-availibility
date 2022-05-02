import { EventAttributes } from 'ics';

import { Slot } from '../../domain/slot/Slot';
import { HiddenName, SlotName } from '../../domain/slot/SlotContent';

export interface SlotJSON {
  name: string;
  day: string;
}

const toStringName = (name: SlotName): string => {
  switch (name) {
    case HiddenName:
      return 'Busy';
    default:
      return name.get();
  }
};

export const toSlotJSON = (slot: Slot): SlotJSON => ({
  name: toStringName(slot.name),
  day: slot.day.get(),
});

export const toEventAttributes = (slot: Slot): EventAttributes => ({
  title: toStringName(slot.name),
  startInputType: 'utc',
  start: slot.day
    .get()
    .split('-')
    .map((unit) => +unit) as [number, number, number],
  duration: { days: 1 },
});
