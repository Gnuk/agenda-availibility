import { Calendar } from '../../../../src/agenda/domain/Calendar';

import { makeCategories } from './Categories.fixture';
import { makeSlots } from './Slots.fixture';

export const makeCalendar = (): Calendar => new Calendar(makeCategories(), makeSlots());
