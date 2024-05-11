import ApplicationError from './ApplicationError.js';

class CarAlreadyRentedError extends ApplicationError {
	constructor(car) {
		super(`${car.name} is already rented!!`);
	}

	get details() {
		return { car: this.car };
	}
}

export default CarAlreadyRentedError;
