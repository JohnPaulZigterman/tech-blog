const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/withauth').default;

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'content',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: [
                'id',
                'content',
                'user_id',
                'post_id',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['name']
            }
        }]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});