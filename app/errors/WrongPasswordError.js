import ApplicationError from './ApplicationError.js';

class WrongPasswordError extends ApplicationError {
	constructor() {
		super('Password is not correct!');
	}
}

export default WrongPasswordError;
