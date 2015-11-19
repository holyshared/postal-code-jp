import ExtendableError from 'es6-error';

export class NotFoundError extends ExtendableError {
  constructor(message) {
    super(message);
  }
}
