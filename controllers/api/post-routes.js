const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/withauth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'name',
            'content',
            'created_at'
        ],
        order: ['created_at', 'DESC'],
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
        }
    ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'content',
            'created_at'
        ],
        include: [
            {
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
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post in database with that ID!' });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        name: req.body.name,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            where: {
                id: req.params.id
            }
        },
        {
            name: req.body.name,
            content: req.body.content
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post in database with that ID!' });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post in database with that ID!' });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

