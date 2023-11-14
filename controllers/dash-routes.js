const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/withauth');

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

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'name',
                'content',
                'created_at'
            ],
            include: [{
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'content',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }]
        });

        if(!postData) {
            res.status(404).json({ message: 'No Post in database with this ID!' });
            return;
        }

        res.status(200).json(postData);

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, (req, res) => res.render('new-post'));

module.exports = router;