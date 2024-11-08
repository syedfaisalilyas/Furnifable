const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        oldPrice: {
            type: Number,
            required: true,
        },
        currentPrice: {
            type: Number,
            required: true,
        },
        offPercentage: {
            type: Number,
            required: true,
        },
        totalRatings: {
            type: Number,
            default: 0,
        },
        averageRatings: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        ownerName: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        filter: {
            type: [String],
            default: [],
        }
    },
    { timestamps: true } // To automatically create createdAt and updatedAt fields
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
