const request = require('supertest');
const app = require('../../app/index.js');

describe('test API', () => {
	test('Should test API connection', async () => {
		const response = await request(app).get('/');

		expect(response.status).toBe(200);
	});
});
