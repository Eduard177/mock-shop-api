import {UserDto} from "../dto/user.dto";

require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const RegistrationError = require('../Errors/registration.error')
const AuthenticationError = require('../Errors/authentication.error')
const DatabaseError = require('../Errors/database.error')

// User Registration

async function register(userDto: UserDto): Promise<any> {
    try {
        const {username, password} = userDto;

        // Check if the username already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return new RegistrationError('Username already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({ username, password: hashedPassword });
        await user.save();

        return { message: 'User registered successfully', statusCode:201 };
    } catch (error) {
        console.error(error);
        return new DatabaseError('Internal Server Error');
    }
}

// User Login

async function login(userDto: UserDto): Promise<any> {
    try {
        const {username, password} = userDto;

        // Check if the user exists
        const user = await User.findOne({username});
        if (!user) {
            return new AuthenticationError('Invalid username or password')
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new AuthenticationError('Invalid username or password')

        }

        // Create and return a JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key');
        return {statusCode: 200, message: 'User successfully authenticated', token };
    } catch (error) {
        console.error(error);
        return new DatabaseError(error);
    }
}
module.exports = {register,login};
