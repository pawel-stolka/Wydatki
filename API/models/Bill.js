var mongoose = require('mongoose')

var billSchema = new mongoose.Schema({
    name: String,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    },
    products: Array,
    type: String,
    extra: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bill', billSchema)