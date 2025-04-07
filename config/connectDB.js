const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('DATN', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00'
});

// Function to connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process if connection fails
    }
};

// Export both the function and the Sequelize instance
module.exports = { connectDB, sequelize };