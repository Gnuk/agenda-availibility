import * as uuid from 'uuid';

const assertValidity = (uid: string): void => {
  if (!uuid.validate(uid)) {
    throw new Error(`The UID "${uid}" is not valid`);
  }
};

export class UID {
  readonly uid: string;

  constructor(uid: string) {
    const trimUID = uid.trim();
    assertValidity(trimUID);
    this.uid = trimUID.toLowerCase();
  }

  static generate(): UID {
    const uid = uuid.v4();
    return new UID(uid);
  }

  static from(uid: string): UID {
    return new UID(uid);
  }

  get(): string {
    return this.uid;
  }
}
