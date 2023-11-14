const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
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
                'post_id'
            ],
            include: {
                model: User,
                attributes: ['name']
            }
        }]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => res.render('signup'));

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [
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
                }
            ]
        });
        if (!postData) {
            res.status(404).json({ message: 'No Post with this ID!' });
            return;
        }

        const post = postData.get({ plain: true });
        console.log(post);
        res.render('single-post', { post, loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post-comments', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'post_id',
                        'user_id',
                        'created_at'
                    ]
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post by that ID!' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('post-comments', { post, loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;