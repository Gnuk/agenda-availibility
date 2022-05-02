import * as express from 'express';
import { Router, Response } from 'express';
import * as ics from 'ics';

import { UID } from '../../../common/UID';
import { Injection } from '../../../Injection';
import { Slot } from '../../domain/slot/Slot';

import { notBadRequest } from './errors/HttpAssert';
import { SlotJSON, toEventAttributes, toSlotJSON } from './SlotFormat';

const toUID = (uid: string): UID => notBadRequest(() => UID.from(uid));

const sendAsICal =
  <Locals>(res: Response<string, Locals>) =>
  (list: Slot[]): void => {
    const icalendar = ics.createEvents(list.map(toEventAttributes));
    res.contentType('text/calendar');
    res.send(icalendar.value);
  };

const sendAsJSON =
  <Locals>(res: Response<SlotJSON[], Locals>) =>
  (list: Slot[]): Response<SlotJSON[]> =>
    res.send(list.map(toSlotJSON));

export const exposeCalendar = ({ calendar }: Injection): Router =>
  express
    .Router()
    .get('/:uid.ics', (req, res) => calendar.listFor(toUID(req.params.uid)).then(sendAsICal(res)))
    .get('/:uid', (req, res) =>
      calendar
        .listFor(toUID(req.params.uid))
        .then(sendAsJSON(res))
        .catch(() => res.status(500).send('Something wrong happens, please try again later.'))
    );
