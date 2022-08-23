const mongoose = require('mongoose');
//const { use } = require('../routes/auth');
const { productSchema } = require("./product");


const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },

    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Please eneter a valid email address',
        },
    },

    password: {
        required: true,
        type: String,
       

    },

    address: {
        type: String,
        default: '',
    },

    type: {
        type: String,
        default: 'user',
    },

    //cart

    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                require: true,
            }
        }
    ]

});

const User = mongoose.model("User", userSchema);
module.exports = User;