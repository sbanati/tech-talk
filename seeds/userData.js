// Import model from directory
const { User} = require("../models");
// Array of blog post test data 
const userData = [
    {
        username: 'Brandon',
        email: 'user1@example.com',
        password: 'password1',
    } ,
    {
        username: 'Kevin',
        email: 'user2@example.com',
        password: 'password2',
    },
    {
        username: 'Jay',
        email: 'user3@example.com',
        password: 'password3',
    },  
    {
        username: 'Peter',
        email: 'user4@example.com',
        password: 'password4',
    },
    {
        username: 'Paulo',
        email: 'user5@example.com',
        password: 'password5',
    },
];

// Function that will seed the user table with test data and use bulkCreate method 
const seedUsers = () => User.bulkCreate(userData);
//Exporting seedPosts function for use in other files
module.exports = seedUsers;