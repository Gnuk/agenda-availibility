import axios from 'axios';
import { Express } from 'express-serve-static-core';

import { UID } from '../common/UID';
import { Config } from '../Config';

import { Calendar } from './domain/Calendar';
import { CategoriesInMemory } from './domain/CategoriesInMemory';
import { Category } from './domain/Category';
import { exposeExpress } from './infrastructure/primary/ExposeExpress';
import { SlotsICS } from './infrastructure/secondary/SlotsICS';

export const getApp = (config: Config): Express => {
  const categories = new CategoriesInMemory(
    Object.entries(config.categories).map(([key, list]) => [UID.from(key), list.map((name) => Category.of(name))])
  );
  const slots = new SlotsICS(axios.create(), config.agenda);

  const calendar = new Calendar(categories, slots);

  return exposeExpress({
    calendar,
  });
};
