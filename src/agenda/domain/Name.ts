export class Name {
  protected readonly name: string;
  constructor(name: string) {
    this.name = name.trim().split(/\s+/).join(' ');
    if (this.name.length === 0) {
      throw new Error('The name is blank');
    }
  }

  static of(name: string) {
    return new Name(name);
  }

  get(): string {
    return this.name;
  }
}
