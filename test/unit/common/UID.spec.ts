import * as uuid from 'uuid';

import { UID } from '../../../src/common/UID';

describe('UID', () => {
  it('Should not create with an invalid UID', () => {
    expect(() => UID.from('INVALID')).toThrow('The UID "INVALID" is not valid');
  });

  it('Should get UID', () => {
    expect(UID.from(' 74E544b9-ab29-4dac-92ba-1c8cbd66caf1\t').get()).toBe('74e544b9-ab29-4dac-92ba-1c8cbd66caf1');
  });

  it('Should generate an UID V4', () => {
    const uid = UID.generate().get();

    expect(uuid.validate(uid)).toBe(true);
    expect(uuid.version(uid)).toBe(4);
  });
});
