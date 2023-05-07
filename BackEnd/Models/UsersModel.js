const mongoose = require("mongoose");
var DB_URL =
    "mongodb+srv://Mariam_Reda:Mariam_Reda@cluster0.jnz2ud6.mongodb.net/users";
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
        required: true,
        validate: {
            validator: (val) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);
            },
            message: (props) => `${props.value} is not a valid Password !`,
        },
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return /^01[0-9]{9}$/.test(val);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
});

module.exports = mongoose.model("auths", UsersSchema);
