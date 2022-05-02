import { LocalDate } from '../../../common/LocalDate';

import { SlotContent } from './SlotContent';

export interface Slot extends SlotContent {
  day: LocalDate;
}
