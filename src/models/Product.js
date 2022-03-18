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
    description: {
        type: String,
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true 
    }, 
    brand: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true 
    },
    description: String
})

module.exports = mongoose.model('Product', productSchema)