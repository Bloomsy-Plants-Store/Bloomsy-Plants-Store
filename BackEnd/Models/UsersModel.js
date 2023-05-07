const mongoose = require("mongoose");
const config=require("../config.json")
var DB_URL =config.MONGODBURL;
var validator = require("validator");
//(1)Connect ---> (3)Listen mongoose.connection.once("open",()=>{}) --> model.find({}).exec()
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
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return /^01[0125][0-9]{8}$/.test(val);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
});

module.exports = mongoose.model("users", UsersSchema);
