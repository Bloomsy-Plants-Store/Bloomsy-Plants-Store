const mongoose = require("mongoose");

const connectToDatabase = require("../Utils/databaseConfig");

let productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    imageUrl:
    {
        type: [String],
        default: [],
    },
    category: {
        type: [String],
        default: [],
    },
    rate: {
        type: Number,
        min: [0, 'Rate cannot be less than 0'], // specify the minimum value and error message if it's violated
        max: [5, 'Rate cannot be greater than 5'], // specify the maximum value and error message if it's violated
    },
    reviews_num: {
        type: Number,
        min: [0, 'Reviews Number cannot be less than 0'], // specify the minimum value and error message if it's violated
    },
    discount: {
        type: Number,
    },
    bestSelling: {
        type: Boolean,
    },
    description: {
        type: String,
    },
    itemsinStock: {
        type: Number,
        min: [0, 'Items In Stock Number cannot be less than 0'], // specify the minimum value and error message if it's violated

    }
});


const Product = connectToDatabase().model('Product', productSchema);
module.exports = Product;
