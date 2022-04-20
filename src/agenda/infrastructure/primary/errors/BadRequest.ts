import { HttpError } from './HttpError';

export class BadRequest extends HttpError {
  getStatus(): number {
    return 400;
  }
}
