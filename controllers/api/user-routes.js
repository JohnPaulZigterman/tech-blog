const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: [
                'id',
                'name',
                'content',
                'created_at'
            ]
        },
        {
            model: Comment,
            attributes: [
                'id',
                'content',
                'created_at'
            ],
            include: {
                model: Post,
                attributes: ['name']
            }
        }
    ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user in database with that ID!' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: { name: req.body.name }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user in database with that name!'});
            return;
        }
        if (!userData.passCheck(req.body.password)) {
            res.status(400).json({ message: 'Invalid Password!' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.name = userData.name;
            req.session.id = userData.id;

            res.json({ user: userData, message: 'Logged In Successfully!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json('No user in database with that ID!');
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(userData => {
        if(!userData) {
            res.status(400).json({ message: 'No user in database with that ID!' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;