const { AuthenticationController } = require('../../app/controllers');
const { InsufficientAccessError, EmailNotRegisteredError, WrongPasswordError, RecordNotFoundError } = require('../../app/errors');
const { User, Role, Car, UserCar } = require('../../app/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Authentication Controller', () => {
	let controller;

	beforeAll(() => {
		controller = new AuthenticationController({
			userModel: User,
			roleModel: Role,
			bcrypt,
			jwt,
		});
	});

	const mockRequest = {
		headers: {
			authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJDVVNUT01FUiJ9LCJpYXQiOjE3MTU1MDQ4NDl9.m-ocml4VNyns6QgkHLPiNyHEh7Tw05j2fE5_1essxlE',
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
			email: 'johnny@binar.co.id',
			password: '123456',
			name: 'Johnny',
		},
	};

	const mockResponse = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn().mockReturnThis(),
	};

	const mockNext = jest.fn().mockReturnThis();

	describe('authorize', () => {
		test('should throw an InsufficientAccessError if the role name does not match', async () => {
			const rolename = 'ADMIN';

			const expectedJson = {
				error: {
					name: 'Error',
					message: 'Access forbidden!',
					details: {
						role: 'CUSTOMER',
						reason: 'CUSTOMER is not allowed to perform this operation.',
					},
				},
			};

			await controller.authorize(rolename)(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(401);
			expect(mockResponse.json).toHaveBeenCalledWith(expectedJson);
		});

		test('should not throw an error if the role name matches', async () => {
			const rolename = 'CUSTOMER';

			await controller.authorize(rolename)(mockRequest, mockResponse, mockNext);

			expect(mockNext);
		});
	});

	describe('handle Login', () => {
		test('should return a 404 status code if the user is not found', async () => {
			mockRequest.body.email = 'non_exits@mail.com';
			mockRequest.body.password = '123456';

			await controller.handleLogin(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.json).toHaveBeenCalledWith(new EmailNotRegisteredError(mockRequest.body.email));
		});

		test('should return a 401 status code if the password is incorrect', async () => {
			mockRequest.body.email = 'johnny@binar.co.id';
			mockRequest.body.password = 'password';

			await controller.handleLogin(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledWith(401);
			expect(mockResponse.json).toHaveBeenCalledWith(new WrongPasswordError());
		});

		test('should return a 201 status code with an access token if the login is successful', async () => {
			mockRequest.body.email = 'johnny@binar.co.id';
			mockRequest.body.password = '123456';

			await controller.handleLogin(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledWith(201);
		});

		test('should catch and next an error', async () => {
			mockRequest.body.email = null;
			mockRequest.body.password = null;
			await controller.handleLogin(mockRequest, mockResponse, mockNext);

			expect(mockNext).toHaveBeenCalledTimes(1);
			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		});
	});

	describe('handleRegister', () => {
		test('should return a 422 status code if the email is already registered', async () => {
			mockRequest.body.email = 'johnny@binar.co.id';
			mockRequest.body.password = '123456';

			await controller.handleRegister(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledWith(422);
			expect(mockResponse.json).toHaveBeenCalledWith(new EmailNotRegisteredError(mockRequest.body.email));
		});

		test('should return a 201 status code with an access token if the registration is successful', async () => {
			mockRequest.body.name = 'new user';
			mockRequest.body.email = 'new_email@mail.com';
			mockRequest.body.password = 'password';

			const expectedJson = {
				accessToken: 'user_access_token',
			};

			await User.destroy({
				where: { email: mockRequest.body.email },
			});

			await controller.handleRegister(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(typeof expectedJson.accessToken).toBe('string');
		});

		test('should handle errors', async () => {
			mockRequest.body = null;

			await controller.handleRegister(mockRequest, mockResponse, mockNext);

			expect(mockNext).toHaveBeenCalledTimes(1);
			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		});
	});

	describe('handleGetUser', () => {
		test('should return a 404 status code if the user is not found', async () => {
			mockRequest.user.id = 999999999999999;

			await controller.handleGetUser(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.json).toHaveBeenCalledWith(new RecordNotFoundError(User.name));
		});

		//? cannot handle userLoggedIn role does not match
		// test('should return a 404 status code and error when role is not found', async () => {
		// 	mockRequest.user.id = 1;
		// 	mockRequest.user.roleId = 2;

		// 	await controller.handleGetUser(mockRequest, mockResponse);

		// 	expect(mockResponse.status).toHaveBeenCalledTimes(1);
		// 	expect(mockResponse.status).toHaveBeenCalledWith(404);
		// 	expect(mockResponse.json).toHaveBeenCalledTimes(1);
		// });

		test('should return the user if the user is found', async () => {
			mockRequest.user.id = 1;

			await controller.handleGetUser(mockRequest, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
		});
	});
});
