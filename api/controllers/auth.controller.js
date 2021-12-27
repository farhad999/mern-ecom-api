
const Joi = require('joi');
const User = require('../models/User');
const hashService = require('../services/hashService')

const register = async (req, res)=>{

    //check if user already exists

    

    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    const {value, error} = schema.validate(req.body);

    if(!error){

        const existsUser = await User.findOne({email: req.body.email});

        if(existsUser){
            return res.json({status: 'failed', message: 'User already exists with this email'});
        }

        value.password = await hashService.hashPassword(value.password);

        const user = new User(value);

        let savedUser = await user.save();
        
        res.json({status: 'success', message: 'User registered'});

    }else{
        res.status(500).json({message: error.message()})
    }

}

module.exports = {register};