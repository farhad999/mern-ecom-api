const Joi = require('joi');
const Product = require('../models/Product');

const index = async (req, res) => {
    const products = Product.find({});

    return res.json({products});
}

const create = async (req, res) => {

    const schema = Joi.object({
        sku: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        stocks: Joi.number().required(),
        category: Joi.string().optional(),
        brand: Joi.string().optional(),
        category: Joi.string()
        //thumbImage: Joi.string(),
       // galleryImage: Joi.array(),
    });
    //images will be handled later
    
    const {value, error} = schema.validate(req.body);

    if(!error){

        try{
            await Product.create(value);

            return res.json({status: 'success', message: 'proudct added'});
        }catch(er){
            return res.status(500).json({message: "Something went wrong"+er.message});
        }

    }else{
        return res.status(500).json({message: 'Validation error '+error.message});
    }
}

const update = async (req, res) => {

    let {id}= req.params;

    const schema = Joi.object({
        sku: Joi.string().optional(),
        title: Joi.string().optional(),
        description: Joi.string(),
        price: Joi.number().optional(),
        stocks: Joi.number().optional(),
        category: Joi.string().optional(),
        brand: Joi.string().optional(),
        category: Joi.string()
    });

    //images will be handled later
    
    const {value, error} = schema.validate(req.body);

    if(!error){

        try{
            await Product.findOneAndUpdate({_id:id}, value, {new: true});
            return res.json({status: 'success', message: 'proudct Updated'});
        }catch(er){
            return res.status(500).json({message: "Something went wrong"+er.message});
        }

    }else{
        return res.status(500).json({message: 'Validation error '+error.message});
    }
}

const deleteProduct = async (req, res) => {
    let {id} = req.params;

    try{
        await Product.findOneAndDelete({_id: id});

        return res.json({status: 'success', message: 'Product Deleted'});
    }catch(er){
        return res.status(500).json({"message": 'Server error '+er.message});
    }
}

module.exports = {
    create, update, index, deleteProduct,
}