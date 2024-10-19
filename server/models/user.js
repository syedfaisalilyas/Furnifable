const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,

        },
        email: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (value) => {
                    const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return result.test(value);
                },
                message: 'Please enter a valid email',
            }
        },
        city: {
            type: String,
            default: "",
        },
        state: {

            type: String,
            default: "",
        },
        locality: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    return value.length >= 8;
                }
                ,
                message: 'Password must be 8 characters long',
            }
        },
    }
);

const user = mongoose.model('User', userSchema);

module.exports = user;