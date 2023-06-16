const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cartSchema = require("./CartModel");
const favouritesSchema = require("./FavouritsModel");
const orderSchema = require("./OrderModel");
var validator = require("validator");

const connectToDatabase = require("../Utils/databaseConfig");

let UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return /^[a-zA-Z\s]{3,30}$/i.test(val);
            },
            message: (props) => `${props.value} is not a valid name !`,
        },

    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => {
                validator.isEmail(val);
            },
            message: (props) => `${props.value} is not a valid Email !`,
        },
    },

    rememberMeToken: {
        type: String,
        default: null,
    },

    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: (val) => {
                if (!val || val.trim() === "") {
                    return true; //allow empty phone number
                } else {
                    return /^01[0125][0-9]{8}$/.test(val);
                }
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    cart: {
        type: [cartSchema],
        default: []
    },
    orders: {
        type: [orderSchema],
        default: []
    },
    favourites:{
        type: [favouritesSchema],
        default: []
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    resetToken: String,
    resetTokenExpiration: Date,

});

UsersSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            })
            .catch(error => {
                next(error);
            });
    } else {
        next();
    }
});


const User = connectToDatabase().model("User", UsersSchema);

module.exports = User;
