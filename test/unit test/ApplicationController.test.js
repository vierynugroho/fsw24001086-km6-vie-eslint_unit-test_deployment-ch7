const { ApplicationController } = require('../../app/controllers');

describe('Application Controller', () => {
	let controller;
	let page, pageSize;

	beforeAll(() => {
		controller = new ApplicationController();
	});

	const mockRequest = {
		method: 'GET',
		url: '/',
		query: {
			page,
			pageSize,
		},
	};

	const mockResponse = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn().mockReturnThis(),
	};

	describe('handle Get Root', () => {
		test('should return a 200 status code and a success message', async () => {
			const expectedJson = {
				status: 'OK',
				message: 'BCR API is up and running!',
			};

			await controller.handleGetRoot(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith(expectedJson);
			expect(typeof expectedJson.status).toBe('string');
			expect(typeof expectedJson.message).toBe('string');
		});
	});

	describe('handle Not Found', () => {
		test('should return a 404 status code and a error message', async () => {
			mockRequest.url = '/unknown';

			const expectedJson = {
				error: {
					name: 'Error',
					message: 'Not found!',
					details: {
						method: mockRequest.method,
						url: mockRequest.url,
					},
				},
			};

			await controller.handleNotFound(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.json).toHaveBeenCalledWith(expectedJson);
			expect(typeof expectedJson.error).toBe('object');
			expect(typeof expectedJson.error.name).toBe('string');
			expect(typeof expectedJson.error.message).toBe('string');
			expect(typeof expectedJson.error.details).toBe('object');
		});
	});

	describe('handle Error', () => {
		test('should return a 500 status code and an error', async () => {
			const err = new Error('An error occurred');

			await controller.handleError(err, mockRequest, mockResponse);

			const expectedJson = {
				error: {
					name: 'Error',
					message: 'An error occurred',
					details: null,
				},
			};

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledTimes(1);
			expect(mockResponse.json).toHaveBeenCalledWith(expectedJson);
			expect(typeof expectedJson.error).toBe('object');
			expect(typeof expectedJson.error.name).toBe('string');
			expect(typeof expectedJson.error.message).toBe('string');
		});
	});

	describe('getOffsetFromRequest', () => {
		test('should calculate the offset correctly', () => {
			mockRequest.query.page = 2;
			mockRequest.query.pageSize = 5;

			const offset = controller.getOffsetFromRequest(mockRequest);

			expect(offset).toBe(5);
		});
	});

	describe('buildPaginationObject', () => {
		test('should calculate pagination correctly', () => {
			const count = 15;
			mockRequest.query.page = 1;
			mockRequest.query.pageSize = 10;

			const pagination = controller.buildPaginationObject(mockRequest, count);

			expect(pagination.page).toBe(1);
			expect(pagination.pageCount).toBe(2);
			expect(pagination.pageSize).toBe(10);
			expect(pagination.count).toBe(15);
		});
	});
});
