const request = require('supertest');
const app = require('../../app/index.js');

describe('test GET /v1/cars', () => {
	test('Should test retrieved cars data', async () => {
		const response = await request(app).get('/v1/cars');

		expect(response.status).toBe(200);
		expect(response._body.cars).toBeDefined();
	});
});
