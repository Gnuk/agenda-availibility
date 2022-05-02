import { LocalDate } from '../../../common/LocalDate';

import { Slot } from './Slot';
import { SlotContent } from './SlotContent';

interface PeriodContent extends SlotContent {
  start: LocalDate;
  end: LocalDate;
}

export class Period {
  private constructor(private readonly content: PeriodContent) {
    if (content.end.before(content.start)) {
      throw new Error(`End date ${content.end.get()} should not be before start date ${content.start.get()}`);
    }
  }

  static of(content: PeriodContent) {
    return new Period(content);
  }

  toSlots(): Slot[] {
    const range = this.content.start.range(this.content.end);
    return range.map(
      (day) =>
        ({
          name: this.content.name,
          category: this.content.category,
          day,
        } as Slot)
    );
  }
}
