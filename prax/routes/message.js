const router = require('express').Router();
const User = require('../models/User');
const Message = require('../models/Message');
const Relation = require('../models/Relation');

//const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');
const db = require('../models');
const auth = require('./verifyToken');

console.log(auth)

// router.post('http://localhost:8080/api/message', auth, async (req, res) => {
// 	const origin = req.user.origin
// 	const { content } = req.body;
// 	const  description  = req.body.description;
// console.log(req.body);
// console.log(req.body.description)

// 	const originExists = await db.User.findOne({ where: { id: origin } });
// 	if (!originExists) return res.status(400).json({ errors: 'Invalid user origin' });
// 	if (!content) return res.status(400).json({ errors: 'Empty text' });
// 	if (!description) return res.status(400).json({ errors: 'Empty text' })

// try {
// 	const newMessage = await db.Message.create(
// 		{ content, description },
// 		{
// 			fields: [ 'content', 'description' ]
// 		}
// 	);

	
// 	} catch (err) {
// 		res.status(500).json({ err });
// 	}
// });





router.get('/api/createpraxspace/:id_destiny', auth, async (req, res) => {
	// const destinyExists = await User.findOne({ where: { id: req.params.id_destiny } });
	// if (!destinyExists) return res.status(400).json({ errors: 'Invalid user destiny' });

	if (req.params.id_destiny.toString() === req.user.id.toString())
		return res.status(400).json({ errors: 'Cant get your own chat' });

	const sentMessages = await Message.findAll({
		where: {
			origin: req.user.id,
			content: req.user.message
			// destiny: req.params.id_destiny
		},
		include: [ { model: User, as: 'infoOrigin' } ]
	});

});

// TK => COMMENTED OUT THIS FUNCTION TO PREVENT API FREEZE ON MESSAGES
// router.get('/', async (req, res) => {
// 	const messages = await Message.findAll({
// 		where: {
// 			id: 1
// 		},
// 		include: [ { model: User, as: 'infoOrigin' } ]
// 	});
// 	res.send(messages);
// });

// router.get('/', async (req, res) => {
// 	const messages = await Message.findAll({
// 		where: {
// 			id: 1
// 		},
// 		include: [ { model: User, as: 'infoOrigin' }, { model: User, as: 'infoDestiny' } ]
// 	});
// 	res.send(messages);
// });



module.exports = router;