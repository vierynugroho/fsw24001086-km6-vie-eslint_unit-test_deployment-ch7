const ApplicationError = require('../../app/errors/ApplicationError');

describe('ApplicationError', () => {
	test('should have a name property', () => {
		const error = new ApplicationError('Error message');
		expect(error.name).toBe('Error');
	});

	test('should have a message property', () => {
		const error = new ApplicationError('Error message');
		expect(error.message).toBe('Error message');
	});

	test('should have a details property', () => {
		const error = new ApplicationError('Error message');
		expect(error.details).toEqual({});
	});

	test('should have a toJSON method', () => {
		const error = new ApplicationError('Error message');
		expect(error.toJSON).toBeInstanceOf(Function);
	});

	test('should return a JSON representation of the error', () => {
		const error = new ApplicationError('Error message');
		const json = error.toJSON();
		expect(json.error.name).toBe('Error');
		expect(json.error.message).toBe('Error message');
		expect(json.error.details).toEqual({});
	});
});
