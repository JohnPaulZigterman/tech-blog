const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/withauth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Comment.findAll(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Comment.update(
        {
            where: {
                id: req.params.id
            }
        },
        {
            content: req.body.content
        }
    )
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No comment in database with that ID!' });
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No comment in database with that ID!' });
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
