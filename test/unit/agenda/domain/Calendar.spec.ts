import { HiddenName } from '../../../../src/agenda/domain/slot/SlotContent';
import { UID } from '../../../../src/common/UID';

import { makeCalendar } from './Calendar.fixture';

describe('Calendar', () => {
  const calendar = makeCalendar();

  it('Should get hidden slots with unknown UID', async () => {
    const list = await calendar.listFor(UID.from('994fea34-a794-4064-8a76-718d3a149eb3'));

    expect(list.map(({ name }) => name)).toEqual(Array(4).fill(HiddenName));
  });

  it('Should get names for matching UID', async () => {
    const list = await calendar.listFor(UID.from('5f3cdc52-4fa4-48ba-90ab-97a1d136143e'));

    expect(list.map(({ name }) => (name === HiddenName ? name : name.get()))).toEqual([HiddenName, 'Second', 'Third', 'Fourth']);
  });
});
