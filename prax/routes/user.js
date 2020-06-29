const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Relation = require('../models/Relation');
const validatorRegisterInput = require('../validation/register');
const validatorLoginInput = require('../validation/login');
const auth = require('./verifyToken');

// router.options('/login', function(req, res){
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
// 	res.header("Access-Control-Allow-Headers", "*")
// 	res.send(200);
// })

router.post('/register', async (req, res) => {
	const { username, password } = req.body;

	const { errors, isValid } = validatorRegisterInput(req.body);
	if (!isValid) return res.status(400).json({ errors });

	const user = await db.User.findOne({ where: { username } });
	if (user) {
		errors.user = 'User has already exists'
		return res.status(400).json({ errors });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const newUser = await db.User.create(
			{
				username,
				password: hashedPassword
			},
			{
				fields: [ 'username', 'password' ]
			}
		);

		//Create a both relations with all the remaining users
		const users = await db.User.findAll();
		const usersFilter = users.filter((user) => user.id !== newUser.id);
		const relationsOrigin = usersFilter.map((user) => {
			console.log(relationsOrigin)
			return {
				origin: newUser.id,
				// destiny: user.id
			};
		});
		// const relationsDestiny = usersFilter.map((user) => {
		// 	console.log(relationsDestiny)
		// 	return {
		// 		origin: user.id,
		// 		destiny: newUser.id
		// 	};
		// });
		// await Relation.bulkCreate(relationsOrigin, { fields: [ 'origin', 'destiny' ] });
		await Relation.bulkCreate(relationsOrigin, { fields: [ 'origin' ] });
		// await Relation.bulkCreate(relationsDestiny, { fields: [ 'origin', 'destiny' ] });
		res.status(200).json({ newUser });
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	console.log(req.body)
	const { errors, isValid } = validatorLoginInput(req.body);
	if (!isValid) return res.status(400).json({ errors });

	const user = await db.User.findOne({ where: { username } });
	if (!user) {
		errors.user = 'User does not exists'
		return res.status(400).json({ errors });
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		errors.password = 'Invalid password'
		return res.status(400).json({ errors });
	}

	const payload = {
		id: user.id,
		username
	};
	const token = await jwt.sign(payload, "Alt_SXSW");

	res.status(200)

	.header('auth-token', token).json({
		success: true,
		token,
		user: {
			id: user.id,
			username: user.username
		}
	});
});



router.get('http://localhost:8080/api/message', auth, async(req, res)=>{
	res.json({current: req.users})
	console.log(req.users)
})

router.get('/all', async (req, res) => {
	const users = await db.User.findAll();
	res.send(users);
	console.log(users)
});

router.get('/current', auth, async(req, res)=>{
	res.json({current: req.user})
	console.log(req.user)
})

module.exports = router;