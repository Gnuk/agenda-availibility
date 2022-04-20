import { UID } from '../../common/UID';

import { Category } from './Category';

export interface Categories {
  listFor(uid: UID): Promise<Category[]>;
}
