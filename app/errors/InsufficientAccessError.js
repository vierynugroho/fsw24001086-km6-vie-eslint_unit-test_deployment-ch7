import ApplicationError from './ApplicationError.js';

class InsufficientAccessError extends ApplicationError {
	constructor(role) {
		super('Access forbidden!');
		this.role = role;
	}

	get details() {
		return {
			role: this.role,
			reason: `${this.role} is not allowed to perform this operation.`,
		};
	}
}

export default InsufficientAccessError;
