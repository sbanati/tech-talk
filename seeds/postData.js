const { Post } = require('../models');

const postData = [
    {
        title: 'My First Blog Post',
        content: ' Hi my name is Brandon and I love to workout!',
        user_id: 1,
    },
    {
        title: 'Drop your favorite chocolate below',
        content: 'My favorite chocolate is reece peanutbutter cups, they are yummy!',
        user_id: 2,
    },
    {
        title: 'Weird IT fix',
        content: 'I once fixed a track pad by closing and opening the Macbook',
        user_id: 3,
    },
    {
        title: 'Favorite breed of dog?',
        content: 'My favorite breed is Shiba Inu',
        user_id: 4,
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

