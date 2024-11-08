const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Initialize express app
const app = express();

// Load configuration from config.json
const configPath = path.join(__dirname, 'config.json');
let config = {};

// Attempt to load config.json, or use default values if unavailable
try {
    const rawData = fs.readFileSync(configPath, 'utf-8');
    config = JSON.parse(rawData);
    console.log('Configuration loaded:', config);
} catch (err) {
    console.error('Error reading config.json. Proceeding with default settings:', err);
}

// Set up port and MongoDB connection string
const PORT = config?.server?.port || 3000;
const DB = config?.database?.connectionString || 'mongodb+srv://faisalilyas2005:gulezahra812004@cluster0.tqian.mongodb.net/mydatabase?retryWrites=true&w=majority';

// Verify that a database connection string is available
if (!DB) {
    console.error("Database connection string not found. Exiting...");
    process.exit(1);
}

// Enable JSON parsing if configured
if (config.features?.enableJsonParsing || true) {
    app.use(express.json());
}

// Import routes dynamically based on config or default path
try {
    const authRouterPath = config.routes?.auth || path.join(__dirname, 'routes', 'auth.js');
    const authRouter = require(authRouterPath);
    app.use(authRouter);
} catch (err) {
    console.error("Error loading auth route:", err);
    process.exit(1);
}
// Import product route dynamically
try {
    const productRouterPath = config.routes?.product || path.join(__dirname, 'routes', 'product.js');
    const productRouter = require(productRouterPath);
    app.use(productRouter);
} catch (err) {
    console.error("Error loading product route:", err);
    process.exit(1);
}
// Connect to MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

// Root route to confirm server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Furnifable API');
});

// Export the app for serverless environments like Vercel
module.exports = app;

// Start the server if not running in a serverless environment
if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`The server is listening on port ${PORT} successfully`);
    });
}