const request = require('supertest');
const app = require('../../app/index.js');

const { User, Role } = require('../../app/models');

describe('Test Auth: /v1/auth/login', () => {
	test('login success, should return accessToken', async () => {
		const data = {
			email: 'johnny@binar.co.id',
			password: '123456',
		};

		const response = await request(app).post('/v1/auth/login').send(data);

		expect(response.status).toBe(201);
		expect(response._body.accessToken).toBeDefined();
	});
});

describe('Test Auth: /v1/auth/login', () => {
	test('login success, should return error not registered', async () => {
		const data = {
			email: 'viery@binar.co.id',
			password: '123456',
		};

		const response = await request(app).post('/v1/auth/login').send(data);

		expect(response.status).toBe(404);
		expect(response._body.error.name).toBe('Error');
		expect(response._body.error.message).toBe(`${data.email} is not registered!`);
		expect(response._body.error.details.email).toBe(`${data.email}`);
	});
});

describe('Test Auth: /v1/auth/login', () => {
	test('login success, should return error wrong password', async () => {
		const data = {
			email: 'johnny@binar.co.id',
			password: 'wrongpassword',
		};

		const response = await request(app).post('/v1/auth/login').send(data);

		expect(response.status).toBe(401);
		expect(response._body.error.name).toBe('Error');
		expect(response._body.error.message).toBe('Password is not correct!');
	});
});

describe('Test Auth: /v1/auth/register', () => {
	test('register success, should return access token', async () => {
		const data = {
			name: 'Viery Nugroho',
			email: 'vierynugroho@binar.co.id',
			password: '123456',
		};

		await User.destroy({
			where: { email: data.email },
		});

		const response = await request(app).post('/v1/auth/register').send(data);

		expect(response.status).toBe(201);
		expect(response._body.accessToken).toBeDefined();
	});
});

describe('Test Auth: /v1/auth/register', () => {
	test('register success, should return error not registered', async () => {
		const data = {
			name: 'Viery Nugroho',
			email: 'vierynugroho@binar.co.id',
			password: '123456',
		};

		const response = await request(app).post('/v1/auth/register').send(data);

		expect(response.status).toBe(422);
		expect(response._body.error.name).toBe('Error');
		expect(response._body.error.message).toBe(`${data.email} is not registered!`);
		expect(response._body.error.details.email).toBe(`${data.email}`);
	});
});
