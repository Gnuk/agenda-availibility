import { AxiosInstance } from 'axios';
import * as ical from 'node-ical';
import { CalendarResponse, DateWithTimeZone, VEvent } from 'node-ical';

import { LocalDate } from '../../../common/LocalDate';
import { Category } from '../../domain/Category';
import { Name } from '../../domain/Name';
import { Period } from '../../domain/slot/Period';
import { Slot } from '../../domain/slot/Slot';
import { Slots } from '../../domain/slot/Slots';

const toLocalDate = (date: DateWithTimeZone): LocalDate => LocalDate.fromCurrentTimezone(date);

const toSlots = (vevent: VEvent): Slot[] =>
  Period.of({
    category: Category.of(vevent.summary),
    name: Name.of(vevent.summary),
    start: toLocalDate(vevent.start),
    end: toLocalDate(vevent.end).yesterday(),
  }).toSlots();

const isFullDay = (value: VEvent): boolean => value.datetype === 'date';

const filterVEvents = (calendar: CalendarResponse): VEvent[] =>
  Object.values(calendar).filter((value) => value.type === 'VEVENT') as VEvent[];

export class SlotsICS implements Slots {
  constructor(private readonly axiosInstance: AxiosInstance, private readonly icsUrl: string) {}

  async list(): Promise<Slot[]> {
    const response = await this.axiosInstance.get(this.icsUrl);
    const calendar = await ical.async.parseICS(response.data);

    return filterVEvents(calendar).filter(isFullDay).flatMap(toSlots);
  }
}
