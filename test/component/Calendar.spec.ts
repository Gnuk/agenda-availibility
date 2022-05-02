import * as fs from 'fs';
import * as path from 'path';

import { MockServer } from 'jest-mock-server';
import request from 'supertest';

import { getApp } from '../../src/agenda/app';

const mockAgenda = (server: MockServer): void => {
  server.get('/agenda.ics').mockImplementation((ctx) => {
    ctx.status = 200;
    ctx.body = fs.readFileSync(path.resolve(__dirname, 'agenda.ics'));
  });
};

const launchApp = () =>
  getApp({
    agenda: 'http://localhost:3033/agenda.ics',
    categories: {
      '5f3cdc52-4fa4-48ba-90ab-97a1d136143e': ['Pear'],
    },
  });

describe('Calendar', () => {
  const server = new MockServer({
    port: 3033,
  });

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  beforeEach(() => server.reset());

  it('Should list slots', async () => {
    mockAgenda(server);
    const app = launchApp();

    const response = await request(app).get('/calendar/5f3cdc52-4fa4-48ba-90ab-97a1d136143e').expect(200);

    const [first, second, , , ...fifth] = response.body;
    expect(first.day).toBe('2022-04-27');
    expect(first.name).toBe('Busy');
    expect(second.day).toBe('2022-04-26');
    expect(second.name).toBe('Pear');
    expect(fifth.map(({ day }: { day: string }) => day)).toEqual(['2022-05-15', '2022-05-16']);
  });

  it('Should list slots in a calendar', async () => {
    mockAgenda(server);
    const app = launchApp();

    const response = await request(app)
      .get('/calendar/5f3cdc52-4fa4-48ba-90ab-97a1d136143e.ics')
      .expect(200)
      .expect('Content-Type', /text\/calendar/);

    ['SUMMARY:Pear', 'SUMMARY:Busy', 'DATE:20220419', 'DATE:20220421', 'DATE:20220426', 'DATE:20220427'].forEach((contain) =>
      expect(response.text).toEqual(expect.stringContaining(contain))
    );
  });
});
