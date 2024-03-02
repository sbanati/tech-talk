const { Comment } = require('../models');

const commentData = [
    {
        comment: 'I am also weird!',
        user_id: 1,
        post_id: 1,

    },
    {
        comment: 'Me too! Drop the routine!',
        user_id: 2,
        post_id: 1,
    },
    {
        comment: 'We should call you Bradicus',
        user_id: 3,
        post_id: 1,
    },
    {
        comment: 'I bet I can squat more than you!',
        user_id: 4,
        post_id: 1,
    },
    {
        comment: 'I like cookies and cream!',
        user_id: 1,
        post_id: 2,
    }
  
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;