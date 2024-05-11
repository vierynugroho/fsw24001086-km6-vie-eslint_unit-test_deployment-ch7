import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';

import { ApplicationController, AuthenticationController, CarController } from './controllers/index.js';
import car from './models/car.js';
import role from './models/role.js';
import user from './models/user.js';
import usercar from './models/usercar.js';

function apply(app) {
	const carModel = car;
	const roleModel = role;
	const userModel = user;
	const userCarModel = usercar;

	const applicationController = new ApplicationController();
	const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel });
	const carController = new CarController({ carModel, userCarModel, dayjs });

	const accessControl = authenticationController.accessControl;

	app.get('/', applicationController.handleGetRoot);

	app.get('/v1/cars', carController.handleListCars);
	app.post('/v1/cars', authenticationController.authorize(accessControl.ADMIN), carController.handleCreateCar);
	app.post('/v1/cars/:id/rent', authenticationController.authorize(accessControl.CUSTOMER), carController.handleRentCar);
	app.get('/v1/cars/:id', carController.handleGetCar);
	app.put('/v1/cars/:id', authenticationController.authorize(accessControl.ADMIN), carController.handleUpdateCar);
	app.delete('/v1/cars/:id', authenticationController.authorize(accessControl.ADMIN), carController.handleDeleteCar);

	app.post('/v1/auth/login', authenticationController.handleLogin);
	app.post('/v1/auth/register', authenticationController.handleRegister);
	app.get('/v1/auth/whoami', authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);

	app.use(applicationController.handleNotFound);
	app.use(applicationController.handleError);

	return app;
}

export default apply;
