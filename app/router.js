const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');

const { ApplicationController, AuthenticationController, CarController } = require('./controllers');

const { User, Role, Car, UserCar } = require('./models');
const router = require('express').Router();

const swaggerDocument = require('../docs/swagger.json');
const swaggerUI = require('swagger-ui-express');

const carModel = Car;
const roleModel = Role;
const userModel = User;
const userCarModel = UserCar;

const applicationController = new ApplicationController();
const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel });
const carController = new CarController({ carModel, userCarModel, dayjs });

const accessControl = authenticationController.accessControl;

router.get('/', applicationController.handleGetRoot);

router.get('/v1/cars', carController.handleListCars);
router.post('/v1/cars', authenticationController.authorize(accessControl.ADMIN), carController.handleCreateCar);
router.post('/v1/cars/:id/rent', authenticationController.authorize(accessControl.CUSTOMER), carController.handleRentCar);
router.get('/v1/cars/:id', carController.handleGetCar);
router.put('/v1/cars/:id', authenticationController.authorize(accessControl.ADMIN), carController.handleUpdateCar);
router.delete('/v1/cars/:id', authenticationController.authorize(accessControl.ADMIN), carController.handleDeleteCar);

router.post('/v1/auth/login', authenticationController.handleLogin);
router.post('/v1/auth/register', authenticationController.handleRegister);
router.get('/v1/auth/whoami', authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);

router.get('/documentation.json', (req, res) => res.send(swaggerDocument));
router.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.use(applicationController.handleNotFound);
router.use(applicationController.handleError);

module.exports = router;
