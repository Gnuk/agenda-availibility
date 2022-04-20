export abstract class HttpError {
  constructor(private readonly reason: string) {}

  abstract getStatus(): number;

  getReason(): string {
    return this.reason;
  }
}
