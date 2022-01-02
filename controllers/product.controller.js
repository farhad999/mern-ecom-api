const Joi = require('joi');
const Product = require('../models/Product');

const index = async (req, res) => {

    const products = await Product.find({}).populate('brand');

    return res.json({products});
}

const create = async (req, res) => {

    const schema = Joi.object({
        sku: Joi.string().optional().allow(''),
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        offerPrice: Joi.number().optional(),
        stocks: Joi.number().required(),
        category: Joi.string().optional(),
        brand: Joi.string().optional(),
        thumbImage: Joi.string(),
       // galleryImage: Joi.array(),
    });
    //images will be handled later

    console.log("value", req.body);

    const {value, error} = schema.validate(req.body);

    if(req.file){
        value.thumbImage = req.file.filename;
    }

    if(!error){

        try{
            await Product.create(value);

            return res.json({status: 'success', message: 'product added'});
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
        sku: Joi.string().optional().allow(''),
        name: Joi.string().optional(),
        description: Joi.string(),
        price: Joi.number().optional(),
        stocks: Joi.number().optional(),
        brand: Joi.string().optional(),
        category: Joi.string()
    });

    //images will be handled later

    const {value, error} = schema.validate(req.body);

    if(!error){

        try{
            await Product.findOneAndUpdate({_id:id}, value, {new: true});
            return res.json({status: 'success', message: 'product Updated'});
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

const view = async (req, res) => {
    let {id} = req.params;

    const product = await Product.findById(id).populate('category')
        .populate('brand');

    res.json({product});

}

module.exports = {
    create, update, index, deleteProduct, view,
}
