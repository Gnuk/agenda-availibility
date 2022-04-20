import { Slot } from './Slot';
import { Slots } from './Slots';

export class SlotsInMemory implements Slots {
  constructor(private readonly repository: Slot[]) {}
  async list(): Promise<Slot[]> {
    return this.repository;
  }
}
