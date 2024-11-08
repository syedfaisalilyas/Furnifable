const express = require('express');
const Product = require('../models/ProductModel');
const authRouter = express.Router();

authRouter.post('/api/addProduct', async (req, res) => {
    try {
        const {
            id,
            image,
            name,
            oldPrice,
            currentPrice,
            offPercentage,
            totalRatings,
            averageRatings,
            description,
            ownerName,
            category,
            filter
        } = req.body;

        // Check if a product with the same ID already exists
        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
            return res.status(400).json({ msg: 'Product with the same ID already exists' });
        } else {
            // Create new product
            let product = new Product({
                id,
                image,
                name,
                oldPrice,
                currentPrice,
                offPercentage,
                totalRatings,
                averageRatings,
                description,
                ownerName,
                category,
                filter
            });

            // Save product to the database
            product = await product.save();
            res.json({ product });
        }

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = authRouter;
