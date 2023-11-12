const { Comment } = require('../models');

const commentData = [
    {
        content: 'Shut up! boo!',
        user_id: 2,
        post_id: 1
    },
    {
        content: 'Shut up! boo!',
        user_id: 2,
        post_id: 2
    },
    {
        content: 'Shut up! boo!',
        user_id: 2,
        post_id: 3
    },
    {
        content: 'Shut up! boo!',
        user_id: 2,
        post_id: 4
    },
    {
        content: 'Totally Agree! Correct!',
        user_id: 3,
        post_id: 1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;