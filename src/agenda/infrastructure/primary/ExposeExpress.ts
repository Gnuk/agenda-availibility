import express, { NextFunction } from 'express';
import { Express, Request, Response } from 'express-serve-static-core';

import { Injection } from '../../../Injection';

import { HttpError } from './errors/HttpError';
import { exposeCalendar } from './ExposeCalendar';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.getStatus());
    res.send(err.getReason());
  }
  next(err);
};

export const exposeExpress = (injection: Injection): Express => express().use('/calendar', exposeCalendar(injection)).use(errorHandler);
