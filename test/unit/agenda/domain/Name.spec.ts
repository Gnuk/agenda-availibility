import { Name } from '../../../../src/agenda/domain/Name';

describe('Name', () => {
  it('Should not be blank', () => {
    expect(() => Name.of('\t \n\r')).toThrow('The name is blank');
  });

  it('Should get name', () => {
    expect(Name.of(' this  is\tthe\r\nname  \t').get()).toBe('this is the name');
  });
});
