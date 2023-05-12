const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config=require("../config.json")
var DB_URL =config.MONGODBURL;
var validator = require("validator");
mongoose.connect(DB_URL, { useNewUrlParser: true });

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
        // required: true,
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
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
      confirmationCode: { 
        type: String, 
        unique: true },
    resetToken: String,
    resetTokenExpiration: Date,
});

// Document middleware
UsersSchema.pre('save', function(next) {
    console.log('before: ',this.password)
    if (this.isNew || this.isModified('password')) {
        console.log('before: ',this.password)
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
  
  
const User = mongoose.model('User', UsersSchema);
module.exports = User;
