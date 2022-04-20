import { Categories } from '../../../../src/agenda/domain/Categories';
import { CategoriesInMemory } from '../../../../src/agenda/domain/CategoriesInMemory';
import { Category } from '../../../../src/agenda/domain/Category';
import { UID } from '../../../../src/common/UID';

export const makeCategories = (): Categories =>
  new CategoriesInMemory([[UID.from('5f3cdc52-4fa4-48ba-90ab-97a1d136143e'), [Category.of('ACME'), Category.of('Pear')]]]);
