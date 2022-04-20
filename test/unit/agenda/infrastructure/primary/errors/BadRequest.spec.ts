import { BadRequest } from '../../../../../../src/agenda/infrastructure/primary/errors/BadRequest';

describe('BadRequest', () => {
  it('Should get', () => {
    const badRequest = new BadRequest('Reason');

    expect(badRequest.getStatus()).toBe(400);
    expect(badRequest.getReason()).toBe('Reason');
  });
});
