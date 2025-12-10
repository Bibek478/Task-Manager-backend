const {verifyToken} = require('../utils/jwt');
const User = require('../models/User');

const auth = async (req, res, next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({
                success:false,
                message:'No Token'
            });
        }
        const decoded = verifyToken(token);

        if(!decoded){
            return res.status(401).json({
                success:false,
                message:'Invalid token'
            });
        }
        const user = await User.findById(decoded.id).select('-password');

        if(!user){
            return res.status(401).json({
                success:false,
                message:'User not found'
            });
        }
        req.user = user;
        next();
    }catch(error){
        res.status(500).json({
            success:false,                
            message:'server error'
        });
    }
};

module.exports = auth;