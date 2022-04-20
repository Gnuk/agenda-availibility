import { AxiosInstance } from 'axios';
import * as ical from 'node-ical';
import { CalendarResponse, DateWithTimeZone, VEvent } from 'node-ical';

import { LocalDate } from '../../../common/LocalDate';
import { Category } from '../../domain/Category';
import { Name } from '../../domain/Name';
import { Slot } from '../../domain/Slot';
import { Slots } from '../../domain/Slots';

const toLocalDate = (date: DateWithTimeZone): LocalDate => LocalDate.fromCurrentTimezone(date);

const toSlot = (vevent: VEvent): Slot => ({
  category: Category.of(vevent.summary),
  name: Name.of(vevent.summary),
  day: toLocalDate(vevent.start),
});

const isFullDay = (value: VEvent): boolean => value.datetype === 'date';

const filterVEvents = (calendar: CalendarResponse): VEvent[] =>
  Object.values(calendar).filter((value) => value.type === 'VEVENT') as VEvent[];

export class SlotsICS implements Slots {
  constructor(private readonly axiosInstance: AxiosInstance, private readonly icsUrl: string) {}

  async list(): Promise<Slot[]> {
    const response = await this.axiosInstance.get(this.icsUrl);
    const calendar = await ical.async.parseICS(response.data);

    return filterVEvents(calendar).filter(isFullDay).map(toSlot);
  }
}
