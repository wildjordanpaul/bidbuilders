'use strict';
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');

// private variables
var hash = Symbol();

class User {
	constructor(data) {
	    this.userId = data.userId || uuid.v4();
	    this.firstname = data.firstname;
	    this.lastname = data.lastname;
	    this.email = data.email;
	    this.userType = data.userType;
	    this[hash] = data.hash || bcrypt.hashSync(data.password, 10);
	}

	get name() { return this.firstname + this.lastname }

	passwordIsValid(password) {
		return bcrypt.compareSync(password, this[hash])
	}

	toJson() {
		return {
			email: this.email,
			firstname: this.firstname,
			lastname: this.lastname,
			userType: this.userType
		}
	}

	toDbModel() {
		return  {
			user_id: this.userId,
			email: this.email,
			firstname: this.firstname,
			lastname: this.lastname,
			user_type: this.userType,
			hash: this[hash]
		}
	}

}

module.exports = function(userData) {
	return new User(userData);
}