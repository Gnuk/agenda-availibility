import { Slot } from './Slot';

export interface Slots {
  list(): Promise<Slot[]>;
}
