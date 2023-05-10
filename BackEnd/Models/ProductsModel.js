const mongoose = require("mongoose");
const config = require("../config.json")
var DB_URL = config.MONGODBURL;
var validator = require("validator");
mongoose.connect(DB_URL, { useNewUrlParser: true });

let productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl:
    {
        type: [String], // specify that this is an array of strings
        required: true, // or false if it's optional
        default: [], // set a default value for the array,
    },
    category: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
        min: [0, 'Rate cannot be less than 0'], // specify the minimum value and error message if it's violated
        max: [5, 'Rate cannot be greater than 5'], // specify the maximum value and error message if it's violated
    },
    reviews_num: {
        type: Number,
        required: true,
        min: [0, 'Reviews Number cannot be less than 0'], // specify the minimum value and error message if it's violated
    },
    discount: {
        type: Number,
        required: true
    },
    bestSelling: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    itemsinStock: {
        type: Number,
        required: true
    }
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;