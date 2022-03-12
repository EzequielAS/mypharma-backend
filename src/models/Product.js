const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true, 
        default: 0
    },
    inventory: { 
        type: Number, 
        required: true, 
        default: 0
    },
    description: String,
    category: String, 
    brand: String
})

module.exports = mongoose.model('Product', productSchema)