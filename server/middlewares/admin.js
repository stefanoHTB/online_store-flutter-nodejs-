const jwt = require('jsonwebtoken');
const User = require('../models/user');

const admin = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        //if no token
        if(!token)
        return res.status(401).json({msg: 'no token, access denied! '});
        //if no legit token
        const verified = jwt.verify(token, "passwordKey");
        if(!verified) return res.status(401).json({msg: 'token verification failed, access denied! '});

        const user = await User.findById(verified.id);
        if ( user.type == 'user' || user.type == 'seller')  {
            return res.status(401).json({msg: 'You are not admin!'})
        }

        req.user = verified.id
        req.token = token;
        next();

    } catch (e) {
        res.status(500).json({error: err.message})


    }
};

module.exports = admin;