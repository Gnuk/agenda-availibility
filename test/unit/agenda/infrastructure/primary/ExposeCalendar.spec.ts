import request from 'supertest';

import { Calendar } from '../../../../../src/agenda/domain/Calendar';
import { Category } from '../../../../../src/agenda/domain/Category';
import { exposeExpress } from '../../../../../src/agenda/infrastructure/primary/ExposeExpress';
import { makeCalendar } from '../../domain/Calendar.fixture';
import { makeSlots } from '../../domain/Slots.fixture';

describe('Expose Calendar', () => {
  it('Should get day list', async () => {
    const app = exposeExpress({
      calendar: makeCalendar(),
    });

    const response = await request(app).get('/calendar/5f3cdc52-4fa4-48ba-90ab-97a1d136143e').expect(200);

    const [first, second] = response.body;
    expect(first.day).toBe('2022-01-01');
    expect(first.name).toBe('Busy');
    expect(second.day).toBe('2022-01-02');
    expect(second.name).toBe('Second');
  });

  it('Should fail on rejection', async () => {
    const app = exposeExpress({
      calendar: new Calendar(
        {
          listFor: (): Promise<Category[]> => Promise.reject(),
        },
        makeSlots()
      ),
    });

    const response = await request(app).get('/calendar/5f3cdc52-4fa4-48ba-90ab-97a1d136143e').expect(500);

    expect(response.text).toBe('Something wrong happens, please try again later.');
  });

  it('Should get 400 on query failure', async () => {
    const app = exposeExpress({
      calendar: makeCalendar(),
    });

    const response = await request(app).get('/calendar/baduid').expect(400);

    expect(response.text).toBe('The UID "baduid" is not valid');
  });
});
