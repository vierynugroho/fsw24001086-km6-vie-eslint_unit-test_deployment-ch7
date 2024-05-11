import ApplicationError from './ApplicationError.js';

class RecordNotFoundError extends ApplicationError {
	constructor(name) {
		super(`${name} not found!`);
	}
}

export default RecordNotFoundError;
