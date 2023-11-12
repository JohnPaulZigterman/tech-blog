const { Post } = require('../models');

const postData = [
    {
        name: 'I Love Tech',
        content: 'Just here to say I am excited for new products',
        user_id: 1
    },
    {
        name: 'I Hate Tech',
        content: 'Progress is bad!',
        user_id: 2
    },
    {
        name: 'Love the new Samsung',
        content: 'They just keep making these bad boys bigger',
        user_id: 1
    },
    {
        name: 'Apple Watch Is Stupid',
        content: 'Everyone Knows It! I Am Brave Enough To Say It!',
        user_id: 3
    }   
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;