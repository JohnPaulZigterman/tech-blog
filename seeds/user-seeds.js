const { User } = require('../models');

const userData = [{
        name: 'John',
        password: 'jpzjpz',
        email: 'johnpaulzigterman@gmail.com'

    },
    {
        name: 'James',
        password: 'kingjames',
        email: 'kingvingrhames@bible.com'
    },
    {
        name: 'Jarvis',
        password: 'javelin',
        email: 'jarvjav@java.net'
    },
    {
        name: 'Jamal',
        password: 'jamal91',
        email: 'jamal@gmail.com'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;