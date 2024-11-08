const express = require('express');
const Product = require('../models/product');
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

authRouter.delete('/api/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const product = await Product.findOne({ id });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Delete product from the database
        await Product.deleteOne({ id });
        res.json({ msg: 'Product deleted successfully' });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = authRouter;
