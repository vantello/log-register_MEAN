const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'));
router.post('/register', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(401).send("Email doesn't exists");
    } else {
        const newUser = new User({ email: email, password: password });
        await newUser.save(); // Al no ser instantani, se li ha de dir que ho faci en un segon pla.
        const token = jwt.sign({ _id: newUser._id }, 'secretKey');
        res.status(200).json({ token });
    }
});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Email doesn't exists");
    if (user.password !== password) return res.status(401).send("Wrong Password");

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return res.status(200).json({ token });
});

router.get('/tasks', (req, res) => {
    res.json([{
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2021-09-24T20:50:13.082Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2021-09-24T20:50:13.082Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2021-09-24T20:50:13.082Z"
        }

    ])
});
router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([{
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2021-09-24T20:50:13.082Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2021-09-24T20:50:13.082Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2021-09-24T20:50:13.082Z"
        }

    ])
});
router.get('/profife'), verifyToken, (req, res) => {
    res.send(req.userId);
}

module.exports = router;

function verifyToken(req, res, next) { //valida si hi ha o no hi ha token
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorize Request');
    }

    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;
    next();

}