// Import the data 
const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

// Establish sequelize connection
const sequelize = require('../config/connection');

// Seed all models
const seedAll = async() => {
    // Sync models with the database and force:true will drop and recreate the tables
    await sequelize.sync({ force: true}); // used in development evironment 
    // Call each seed function
    await seedUsers();
    await seedPosts();
    await seedComments();
    
    // Exit script after seeding 
    process.exit(0);

};

// Seed the database 
seedAll();