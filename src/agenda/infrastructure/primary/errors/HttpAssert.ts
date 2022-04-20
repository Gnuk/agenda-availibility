import { BadRequest } from './BadRequest';

export const notBadRequest = <T>(callable: () => T): T => {
  try {
    return callable();
  } catch (error) {
    const { message } = error as Error;
    throw new BadRequest(message);
  }
};
