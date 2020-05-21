const router = require('express').Router();
const User = require('../models/user');
const Message = require('../models/Message');
const Relation = require('../models/Relation');
const auth = require('./verifyToken');


router.get('/', auth, async (req, res) => {
    console.log(Relation);
    const myRelations = await Relation.findAll(
        {
            where: {
                origin: req.user.id
            },
            include: [ 
                {model: User, as: 'infoOrigin'},
                // {model: User, as: 'infoDestiny'},
                {model: Message, as: 'infoLastMessage'}
             ]
        }
    )
    // console.log(myRelations);
    // myRelations.sort((a, b)=>{
    //     if((a.infoLastMessage && b.infoLastMessage) && (a.infoLastMessage.createdAt > b.infoLastMessage.createdAt)) return -1
    //     if((a.infoLastMessage && b.infoLastMessage) &&(a.infoLastMessage.createdAt < b.infoLastMessage.createdAt)) return 1
    //     if(!a.infoLastMessage || !b.infoLastMessage) return 2
    //     return 0
    // })
	res.status(200).json({ myRelations });
});

module.exports = router;