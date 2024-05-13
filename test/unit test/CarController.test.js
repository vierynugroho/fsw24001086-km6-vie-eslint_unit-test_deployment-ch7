const { CarController } = require('../../app/controllers');
const { Car, UserCar } = require('../../app/models');
const dayjs = require('dayjs');

describe('Car Controller', () => {
	let controller;

	const mockRequest = {
		query: {
			size: 'small',
			availableAt: '2024-05-15',
		},
		params: {
			id: 1,
			pageSize: 10,
		},
		user: {
			id: 1,
			name: 'Johnny',
			email: 'johnny@binar.co.id',
			image: null,
			createdAt: '2024-05-11T12:15:36.452Z',
			updatedAt: '2024-05-11T12:15:36.452Z',
			roleId: 1,
		},
		body: {
			name: 'New Car',
			price: 10000,
			size: 'small',
			image: 'new-car-image.jpg',

			rentStartedAt: '2024-05-15',
			rentEndedAt: '2024-05-16',
		},
	};

	const mockResponse = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn().mockReturnThis(),
	};

	const mockNext = jest.fn().mockReturnThis();

	beforeAll(() => {
		controller = new CarController({
			carModel: Car,
			userCarModel: UserCar,
			dayjs: dayjs,
		});
	});

	describe('handleListCars', () => {
		test('should return a list of cars', async () => {
			await controller.handleListCars(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledTimes(1);
		});
	});

	describe('handleGetCar', () => {
		test('should return a car', async () => {
			await controller.handleGetCar(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledTimes(1);
		});

		test('should return an error if the car is not found', async () => {
			mockRequest.params.id = 9999999999;

			await controller.handleGetCar(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith(null);
		});
	});

	describe('handleCreateCar', () => {
		test('should create a new car', async () => {
			await controller.handleCreateCar(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledTimes(1);
		});

		test('should return an error if the car creation fails', async () => {
			mockRequest.body = null;

			const expectedJson = {
				error: {
					message: 'error message',
					name: 'name',
				},
			};

			await controller.handleCreateCar(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(422);
			expect(typeof expectedJson.error.message).toBe('string');
			expect(typeof expectedJson.error.name).toBe('string');
		});
	});

	describe('handleRentCar', () => {
		test('should create a new user-car record', async () => {
			mockRequest.params = {
				id: 15,
				pageSize: 10,
			};

			mockRequest.body = {
				rentStartedAt: '2024-05-13T05:30:28.698Z',
				rentEndedAt: '2024-05-13T05:30:28.698Z',
			};

			await UserCar.destroy({
				where: {
					carId: mockRequest.params.id,
				},
			});

			await controller.handleRentCar(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledWith(201);
		});

		test('should return 422 if car is already rented', async () => {
			mockRequest.params = {
				id: 15,
				pageSize: 10,
			};

			mockRequest.body = {
				rentStartedAt: '2024-05-13T05:30:28.698Z',
				rentEndedAt: '2024-05-13T05:30:28.698Z',
			};

			await controller.handleRentCar(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledWith(422);
			expect(mockResponse.json).toHaveBeenCalledTimes(1);
			expect(mockNext).toHaveBeenCalledTimes(0);
		});

		test('should handle errors', async () => {
			mockRequest.body = null;

			await controller.handleRentCar(mockRequest, mockResponse, mockNext);

			expect(mockNext).toHaveBeenCalledTimes(1);
			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		});
	});

	describe('handleUpdateCar', () => {
		test('should update a car', async () => {
			mockRequest.params.id = 19;
			mockRequest.body = {
				name: 'updated car',
				price: 10000,
				size: 'small',
				image: 'updated-car-image.jpg',
				isCurrentlyRented: false,
			};

			await controller.handleUpdateCar(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledTimes(1);
		});

		test('should return an error if the car update fails', async () => {
			mockRequest.params.id = 9999999999;

			await controller.handleUpdateCar(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(422);
			expect(mockResponse.json).toHaveBeenCalledTimes(1);
		});
	});

	describe('handleDeleteCar', () => {
		test('should delete a car', async () => {
			mockRequest.params.id = 8;

			await controller.handleDeleteCar(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(204);
		});
	});
});
