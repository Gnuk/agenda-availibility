import { UID } from '../../common/UID';

import { Categories } from './Categories';
import { Category } from './Category';

export class CategoriesInMemory implements Categories {
  constructor(private readonly repository: [UID, Category[]][]) {}

  async listFor(uid: UID): Promise<Category[]> {
    const result = this.repository.find(([otherUid]) => otherUid.get() === uid.get());
    if (result === undefined) {
      return [];
    }
    const [, categories] = result;
    return categories;
  }
}
